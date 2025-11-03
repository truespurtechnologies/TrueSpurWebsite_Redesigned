import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  projectType: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
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

    // Get environment variables
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.FROM_EMAIL || "noreply@truespur.ai"
    const toEmail = process.env.TO_EMAIL || "info@truespur.ai"

    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set")
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 })
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey)

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
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New Contact Form Submission: ${body.projectType} - ${body.firstName} ${body.lastName}`,
        text: recipientEmailContent,
      })

      // Send confirmation email to the sender
      await resend.emails.send({
        from: fromEmail,
        to: body.email,
        subject: "Thank you for contacting TrueSpur Technology Solutions",
        text: senderEmailContent,
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
