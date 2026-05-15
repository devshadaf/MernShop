const nodemailer = require("nodemailer");
const { emailUser, emailPass } = require("../utilities/constant");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

const sendEmail = async ({ to, subject, body }) => {
  return await transporter.sendMail({
    from: `MernShop <${emailUser}>`,
    to,
    subject,
    html: `
            <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
            <h2 style="padding:20px; text-align:center; font-size:12px;">Welcome to MernShop 🎉</h2>
            <h1 style="padding:20px; text-align:center; font-size:12px;">${body}</h1>
            <p style="background:#f1f1f1; padding:20px; text-align:center; font-size:12px; color:#777;">
              © 2026 MernShop. All rights reserved.
            </p>
            </body>
        `,
  });
};

module.exports=sendEmail

