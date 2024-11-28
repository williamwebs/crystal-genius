import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL, // clients email
    pass: process.env.USER_PASSWORD,
  },
});

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string | "no message";
}

export const POST = async (req: NextRequest) => {
  const {
    name,
    email,
    phone,
    message = "no message",
  }: ContactFormData = await req.json();
  console.log(name, email, phone, message);

  const htmlBody = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            }
            .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
            }
            .content {
            padding: 20px;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <div class="header">
            <h2>From Crystal Genius Website</h2>
            </div>
            <div class="content">
            <p>A new message has been received from the contact form:</p>
            <ul>
                <li><strong>Name:</strong> ${name} </li>
                <li><strong>Email:</strong> ${email} </li>
                <li><strong>Phone:</strong> ${phone} </li>
                <li><strong>Message:</strong> ${message} </li>
            </ul>
            </div>
        </div>
        </body>
        </html>`;

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.USER_EMAIL,
      subject: "Contact Form Submission",
      html: htmlBody,
    });
    return NextResponse.json(
      {
        message: "Your message has been sent!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Error sending message. Try again! ${error}` },
      { status: 500 }
    );
  }
};
