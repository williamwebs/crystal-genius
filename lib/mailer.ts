import nodemailer from "nodemailer";
import { koboToNaira } from "../types/database";

type DrawingPurchaseEmailParams = {
  buyerEmail: string;
  buyerName: string;
  drawingTitle: string;
  amountKobo: number;
  reference: string;
  downloadUrl: string;
};

function getRequiredEnv(name: "USER_EMAIL" | "USER_PASSWORD") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} environment variable`);
  }

  return value;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: getRequiredEnv("USER_EMAIL"),
    pass: getRequiredEnv("USER_PASSWORD"),
  },
});

export async function sendDrawingPurchaseEmail({
  buyerEmail,
  buyerName,
  drawingTitle,
  amountKobo,
  reference,
  downloadUrl,
}: DrawingPurchaseEmailParams) {
  const senderEmail = getRequiredEnv("USER_EMAIL");
  const safeBuyerName = escapeHtml(buyerName || "there");
  const safeDrawingTitle = escapeHtml(drawingTitle);
  const safeReference = escapeHtml(reference);
  const formattedAmount = koboToNaira(amountKobo);

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: #333333; color: #fff; padding: 24px; text-align: center; }
        .header h2 { margin: 0; font-size: 20px; }
        .content { padding: 32px 24px; }
        .content h3 { color: #333; margin-top: 0; }
        .detail { background: #f9f9f9; border-radius: 6px; padding: 16px; margin: 16px 0; }
        .detail p { margin: 4px 0; color: #555; font-size: 14px; }
        .btn { display: inline-block; background: #e53935; color: #ffffff !important; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: bold; margin-top: 16px; }
        .warning { background: #fff8e1; border: 1px solid #ffe082; border-radius: 6px; padding: 12px; margin-top: 20px; font-size: 13px; color: #795548; }
        .footer { padding: 16px 24px; text-align: center; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Crystal Genius - Purchase Confirmation</h2>
        </div>
        <div class="content">
          <h3>Hi ${safeBuyerName},</h3>
          <p>Thank you for your purchase. Your payment has been confirmed.</p>

          <div class="detail">
            <p><strong>Drawing:</strong> ${safeDrawingTitle}</p>
            <p><strong>Amount:</strong> ${formattedAmount}</p>
            <p><strong>Reference:</strong> ${safeReference}</p>
          </div>

          <p>Click the button below to download your full design files:</p>
          <a href="${downloadUrl}" class="btn">Download Design Files</a>

          <div class="warning">
            This download link will expire in <strong>24 hours</strong>.
            Please download your files before then.
          </div>
        </div>
        <div class="footer">
          &copy; Crystal Genius International Limited. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Crystal Genius" <${senderEmail}>`,
    to: buyerEmail,
    subject: `Your Design Files - ${drawingTitle}`,
    html: emailHtml,
  });
}
