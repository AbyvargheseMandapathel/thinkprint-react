import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Define allowed origins
  const allowedOrigins = ['http://localhost:5173', 'https://thinkprint.shop'];
  const origin = req.headers.origin;

  // Set CORS headers if the origin is allowed
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { name, email, phone, message } = req.body;

  // Ensure required fields are provided
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Create a transporter using your email service
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "edxfr3q@gmail.com",// Use environment variables
        pass: "mkzdmckbuujxvemm"
      },
    });

    // Setup email data
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'edxfr3q@gmail.com', // Replace with your email
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
