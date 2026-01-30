import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface WaitlistFormData {
  name: string
  email: string
  organization?: string
  product: string
}

export async function POST(request: NextRequest) {
  try {
    const body: WaitlistFormData = await request.json()

    if (!body.name?.trim() || !body.email?.trim() || !body.product?.trim()) {
      return NextResponse.json({ error: "Name, email, and product are required" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = parseInt(process.env.SMTP_PORT || "587")
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const fromEmail = process.env.FROM_EMAIL || "noreply@truespur.ai"
    const toEmail = process.env.TO_EMAIL || "info@truespur.ai"

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Waitlist email configuration is incomplete")
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

    const recipientEmailContent = `
New Waitlist Submission from TrueSpur Website

Product: ${body.product}

Details:
- Name: ${body.name}
- Email: ${body.email}
- Organization: ${body.organization || "(not provided)"}

Submitted at: ${new Date().toLocaleString()}
    `.trim()

    const senderEmailContent = `
Thank you for joining the ${body.product} waitlist!

We have received your interest and will reach out with updates as we progress.

Best regards,
TrueSpur Technology Solutions Team
"We Craft. You Lead."
    `.trim()

    try {
      await transporter.sendMail({
        from: `"TrueSpur Website" <${fromEmail}>`,
        to: toEmail,
        subject: `New Waitlist Submission: ${body.product} - ${body.name}`,
        text: recipientEmailContent,
        html: recipientEmailContent.replace(/\n/g, "<br>"),
      })

      await transporter.sendMail({
        from: `"TrueSpur Technology Solutions" <${fromEmail}>`,
        to: body.email,
        subject: `You're on the ${body.product} waitlist`,
        text: senderEmailContent,
        html: senderEmailContent.replace(/\n/g, "<br>"),
      })

      console.log("Waitlist submission processed successfully:", {
        name: body.name,
        email: body.email,
        product: body.product,
        organization: body.organization,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          success: true,
          message: "You're on the waitlist. We'll keep you updated.",
        },
        { status: 200 },
      )
    } catch (emailError) {
      console.error("Waitlist email sending failed:", emailError)

      return NextResponse.json(
        {
          success: false,
          message: "We recorded your waitlist request, but there was an issue sending email. Please try again later.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Waitlist error:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
