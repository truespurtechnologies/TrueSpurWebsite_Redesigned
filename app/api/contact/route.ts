import { type NextRequest, NextResponse } from "next/server"

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

    // Format the email content
    const emailContent = `
New Contact Form Submission:

Name: ${body.firstName} ${body.lastName}
Email: ${body.email}
Project Type: ${body.projectType}

Message:
${body.message}
    `.trim()

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // For now, just log the submission
    console.log("Contact form submission:", {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      projectType: body.projectType,
      message: body.message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll get back to you soon!",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
