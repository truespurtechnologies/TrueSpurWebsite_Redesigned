// Test script for Spaceship email SMTP configuration
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testSpaceshipEmail() {
  // Get configuration from environment
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromEmail = process.env.FROM_EMAIL || 'noreply@truespur.ai';
  const toEmail = process.env.TO_EMAIL || 'info@truespur.ai';

  console.log('Testing Spaceship Email Configuration...');
  console.log('SMTP Host:', smtpHost);
  console.log('SMTP Port:', smtpPort);
  console.log('From Email:', fromEmail);
  console.log('To Email:', toEmail);
  console.log('---');

  // Check if all required variables are set
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error('❌ Missing required environment variables:');
    if (!smtpHost) console.error('  - SMTP_HOST');
    if (!smtpUser) console.error('  - SMTP_USER');
    if (!smtpPass) console.error('  - SMTP_PASS');
    return;
  }

  try {
    // Create transporter
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
    });

    // Test connection
    console.log('🔄 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    // Send test email
    console.log('📧 Sending test email...');
    const info = await transporter.sendMail({
      from: `"TrueSpur Test" <${fromEmail}>`,
      to: toEmail,
      subject: 'Test Email from TrueSpur Website',
      text: `This is a test email sent at ${new Date().toLocaleString()}\n\nIf you received this, your Spaceship email configuration is working correctly!`,
      html: `<p>This is a test email sent at ${new Date().toLocaleString()}</p><p><strong>If you received this, your Spaceship email configuration is working correctly!</strong></p>`,
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);

  } catch (error) {
    console.error('❌ Email test failed:');
    console.error('Error:', error.message);

    if (error.code === 'EAUTH') {
      console.log('\n🔧 Possible solutions:');
      console.log('  - Check your SMTP username and password');
      console.log('  - Verify your Spaceship email account is active');
      console.log('  - Contact Spaceship support for correct SMTP settings');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Possible solutions:');
      console.log('  - Check SMTP host and port');
      console.log('  - Verify SMTP server is accessible');
      console.log('  - Contact Spaceship support for server details');
    }
  }
}

testSpaceshipEmail();
