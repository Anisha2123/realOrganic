
require("dotenv").config();
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendOrderEmail = async (order, userEmail) => {

  const itemsHTML = order.orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border:1px solid #ddd;">${item.name}</td>
        <td style="padding:10px;border:1px solid #ddd;">${item.qty}</td>
        <td style="padding:10px;border:1px solid #ddd;">₹${item.price}</td>
      </tr>
    `
    )
    .join("");

  const htmlTemplate = `
  <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:30px">
    <div style="max-width:600px;margin:auto;background:white;border-radius:8px;padding:25px">

      <h2 style="color:#2e7d32;text-align:center">
        🌿 RealOrganic Order Confirmation
      </h2>

      <p>Thank you for your order!</p>

      <h3>Order Details</h3>

      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Payment:</strong> Paid</p>

      <h3>Customer Information</h3>

      <p>
        <strong>Name:</strong> ${order.customerInfo.name}<br>
        <strong>Phone:</strong> ${order.customerInfo.phone}<br>
        <strong>Address:</strong> ${order.customerInfo.address}
      </p>

      <h3>Items Ordered</h3>

      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:#f0f0f0">
            <th style="padding:10px;border:1px solid #ddd">Product</th>
            <th style="padding:10px;border:1px solid #ddd">Qty</th>
            <th style="padding:10px;border:1px solid #ddd">Price</th>
          </tr>
        </thead>

        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <h3 style="text-align:right;margin-top:20px">
        Total: ₹${order.totalPrice}
      </h3>

      <p style="margin-top:30px">
        We will notify you when your order ships.
      </p>

      <hr>

      <p style="font-size:12px;color:#777;text-align:center">
        RealOrganic • Organic Products Delivered Fresh 🌱
      </p>

    </div>
  </div>
  `;

  try {

    // EMAIL TO CUSTOMER
    await transporter.sendMail({
      from: `"RealOrganic" <${process.env.OWNER_EMAIL}>`,
      to: userEmail,
      subject: "Your Order Confirmation - RealOrganic",
      html: htmlTemplate,
    });

    // EMAIL TO ADMIN
    await transporter.sendMail({
      from: `"RealOrganic Orders" <${process.env.OWNER_EMAIL}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Order Received - ${order._id}`,
      html: htmlTemplate,
    });

  } catch (error) {
    console.error("Email Error:", error);
  }
};

module.exports = sendOrderEmail;