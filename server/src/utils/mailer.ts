// utils/sendMail.ts
import nodemailer from "nodemailer";
import config from "../config/config";

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.MAIL_USER,
      pass: config.MAIL_PASS,
    },
  });

  const verifyUrl = `${config.CLIENT_URL}/verify-email/${token}`;

  await transporter.sendMail({
    from: `"Soundora:" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `<p>Please click the link to verify your email:</p><a href="${verifyUrl}">verify mail</a>`,
  });
};
