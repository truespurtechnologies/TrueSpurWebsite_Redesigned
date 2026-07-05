import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { rateLimit } from "@/lib/rate-limit"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  projectType: string
  message: string
}

const limiter = rateLimit({
  interval: 15 * 60 * 1000,
  uniqueTokenPerInterval: 5,
})

export async function POST(request: NextRequest) {
  try {
    const identifier = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "anonymous"
    const rateLimitResult = limiter.check(identifier)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
            "Retry-After": Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        },
      )
    }

    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.firstName?.trim() || !body.lastName?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Get Spaceship email configuration
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = parseInt(process.env.SMTP_PORT || "587")
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const fromEmail = process.env.FROM_EMAIL || "noreply@truespur.ai"
    const toEmail = process.env.TO_EMAIL || "info@truespur.ai"

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("Spaceship email configuration is incomplete")
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 })
    }

    // Create nodemailer transporter for Spaceship SMTP
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    // Format the email content for the recipient
    const recipientEmailContent = `
New Contact Form Submission from TrueSpur Website

Contact Details:
- Name: ${body.firstName} ${body.lastName}
- Email: ${body.email}
- Project Type: ${body.projectType}

Message:
${body.message}

Submitted at: ${new Date().toLocaleString()}
    `.trim()

    // Format the email content for the sender (confirmation)
    const senderEmailContent = `
Thank you for contacting TrueSpur Technology Solutions!

We have received your message and will get back to you within 24 hours.

Your submission details:
- Name: ${body.firstName} ${body.lastName}
- Project Type: ${body.projectType}

Message:
${body.message}

Best regards,
TrueSpur Technology Solutions Team
"We Craft. You Lead."
    `.trim()

    try {
      // Send email to the company
      await transporter.sendMail({
        from: `"TrueSpur Website" <${fromEmail}>`,
        to: toEmail,
        subject: `New Contact Form Submission: ${body.projectType} - ${body.firstName} ${body.lastName}`,
        text: recipientEmailContent,
        // Optional: Add HTML version
        html: recipientEmailContent.replace(/\n/g, '<br>'),
      })

      // Send confirmation email to the sender
      await transporter.sendMail({
        from: `"TrueSpur Technology Solutions" <${fromEmail}>`,
        to: body.email,
        subject: "Thank you for contacting TrueSpur Technology Solutions",
        text: senderEmailContent,
        html: senderEmailContent.replace(/\n/g, '<br>'),
      })

      // Log successful submission
      console.log("Contact form submission processed successfully:", {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        projectType: body.projectType,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your message! We've sent you a confirmation email and will get back to you within 24 hours.",
        },
        { status: 200 },
      )
    } catch (emailError) {
      console.error("Email sending failed:", emailError)

      // Still log the submission even if email fails
      console.log("Contact form submission (email failed):", {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        projectType: body.projectType,
        timestamp: new Date().toISOString(),
        error: emailError instanceof Error ? emailError.message : "Unknown email error",
      })

      return NextResponse.json(
        {
          success: false,
          message: "Your message was received but there was an issue sending the email. Please try again or contact us directly.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
