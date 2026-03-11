const nodemailer = require("nodemailer");

const sendEmailOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
  tls: {
    rejectUnauthorized: false
  }
});
    console.log("SMTP USER:", process.env.BREVO_SMTP_USER);
console.log("SMTP KEY:", process.env.BREVO_SMTP_KEY);

    const mailOptions = {
      from: '"Real Organic" <realorganic567@gmail.com>', // must be verified in Brevo
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP Code</h2>
        <p>Your verification code is:</p>
        <h1>${otp}</h1>
        <p>This code expires in 5 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent successfully");
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmailOtp;