import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface IntakeFormData {
  fullName: string
  email: string
  phoneCountryCode: string
  phoneNumber: string
  company: string
  role: string
  modules: string[]
  modulesOther?: string
  requirements: string
  source?: "get-started" | "start-project" | "get-proposal" | "success-story" | null
}

export async function POST(request: NextRequest) {
  try {
    const body: IntakeFormData = await request.json()

    if (!body.fullName?.trim() || !body.email?.trim() || !body.phoneNumber?.trim()) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 })
    }

    if (!body.company?.trim() || !body.role?.trim()) {
      return NextResponse.json({ error: "Company and role are required" }, { status: 400 })
    }

    if (!Array.isArray(body.modules) || body.modules.length === 0) {
      return NextResponse.json({ error: "At least one module must be selected" }, { status: 400 })
    }

    if (body.modules.includes("Other") && !body.modulesOther?.trim()) {
      return NextResponse.json({ error: "Please describe the other modules you need" }, { status: 400 })
    }

    if (!body.requirements?.trim()) {
      return NextResponse.json({ error: "Project requirements are required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const safeBody: IntakeFormData = {
      fullName: body.fullName.trim().slice(0, 150),
      email: body.email.trim().slice(0, 200),
      phoneCountryCode: body.phoneCountryCode?.trim().slice(0, 8) || "+1",
      phoneNumber: body.phoneNumber.trim().slice(0, 32),
      company: body.company.trim().slice(0, 200),
      role: body.role.trim().slice(0, 200),
      modules: body.modules.slice(0, 20),
      modulesOther: body.modulesOther?.trim().slice(0, 500),
      requirements: body.requirements.trim().slice(0, 4000),
      source: body.source ?? null,
    }

    const storageEndpoint = process.env.INTAKE_SHEET_ENDPOINT
    const storageSecret = process.env.INTAKE_SHEET_SECRET

    if (storageEndpoint) {
      try {
        await fetch(storageEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(storageSecret ? { "X-Intake-Secret": storageSecret } : {}),
          },
          body: JSON.stringify({
            ...safeBody,
            createdAt: new Date().toISOString(),
          }),
        })
      } catch (storageError) {
        console.error("Intake storage error:", storageError)
      }
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = parseInt(process.env.SMTP_PORT || "587")
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const fromEmail = process.env.FROM_EMAIL || "noreply@truespur.ai"
    const toEmail = process.env.TO_EMAIL || "info@truespur.ai"

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Intake email configuration is incomplete")
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    const modulesText = safeBody.modules.join(", ")

    const recipientEmailContent = `
New Project / Startup Enquiry from TrueSpur Website

Source CTA: ${safeBody.source || "Not specified"}

Contact Details:
- Name: ${safeBody.fullName}
- Email: ${safeBody.email}
- Phone: ${safeBody.phoneCountryCode} ${safeBody.phoneNumber}
- Company: ${safeBody.company}
- Role: ${safeBody.role}

Requested Modules:
${modulesText}
${safeBody.modulesOther ? `\nOther details: ${safeBody.modulesOther}\n` : ""}

Project Requirements:
${safeBody.requirements}

Submitted at: ${new Date().toLocaleString()}
    `.trim()

    const senderEmailContent = `
Thank you for reaching out to TrueSpur Technology Solutions!

We have received your enquiry and a copy of your details is included below. Our team will review your
requirements and get back to you shortly.

Your submission details:
- Name: ${safeBody.fullName}
- Email: ${safeBody.email}
- Phone: ${safeBody.phoneCountryCode} ${safeBody.phoneNumber}
- Company: ${safeBody.company}
- Role: ${safeBody.role}
- Modules: ${modulesText}${safeBody.modulesOther ? ` (Other: ${safeBody.modulesOther})` : ""}

Project Requirements:
${safeBody.requirements}

Best regards,
TrueSpur Technology Solutions Team
"We Craft. You Lead."
    `.trim()

    try {
      await transporter.sendMail({
        from: `"TrueSpur Website" <${fromEmail}>`,
        to: toEmail,
        subject: `New Enquiry: ${safeBody.fullName}`,
        text: recipientEmailContent,
        html: recipientEmailContent.replace(/\n/g, "<br>"),
      })

      await transporter.sendMail({
        from: `"TrueSpur Technology Solutions" <${fromEmail}>`,
        to: safeBody.email,
        subject: "We have received your enquiry – TrueSpur Technology Solutions",
        text: senderEmailContent,
        html: senderEmailContent.replace(/\n/g, "<br>"),
      })

      console.log("Intake form submission processed successfully", {
        fullName: safeBody.fullName,
        email: safeBody.email,
        company: safeBody.company,
        role: safeBody.role,
        source: safeBody.source,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          success: true,
          message:
            "Thank you for your enquiry! We have sent a confirmation email and will get back to you as soon as possible.",
        },
        { status: 200 },
      )
    } catch (emailError) {
      console.error("Intake email sending failed:", emailError)

      return NextResponse.json(
        {
          success: false,
          error:
            "Your enquiry was received but there was an issue sending email notifications. Please try again or contact us directly.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Intake form error:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
