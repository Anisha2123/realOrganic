require("dotenv").config();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function test() {
    console.log("SMTP USER:", process.env.BREVO_SMTP_USER);
console.log("SMTP PASS:", process.env.BREVO_SMTP_PASS);
  const info = await transporter.sendMail({
    from: `"RealOrganic Test" <${process.env.OWNER_EMAIL}>`,
    to: "birlaani@gmail.com",
    subject: "SMTP Test",
    text: "Email working"
  });

  console.log("Email sent:", info.messageId);
}

test();