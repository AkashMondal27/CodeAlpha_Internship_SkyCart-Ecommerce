// import { createTransport } from "nodemailer";
// import otpTemplate from "../templates/otp.template.js";

// const sendOtp = async (email, subject, otp) => {

//     const transporter = createTransport({
//         host: process.env.SMTP_HOST,
//         port: Number(process.env.SMTP_PORT),
//         secure: false,
//         auth: {
//             user: process.env.SMTP_GMAIL,
//             pass: process.env.SMTP_PASS
//         },
//           tls: {
//         minVersion: "TLSv1.2"
//     }
//     });

//     await transporter.sendMail({
//         from: `"SkyCart" <${process.env.SMTP_GMAIL}>`,
//         to: email,
//         subject: subject,

//         // Fallback for email clients that don't support HTML
//         text: `Your SkyCart OTP is: ${otp}. This OTP will expire in 5 minutes.`,

//         // HTML email
//         html: otpTemplate(otp)
//     });
// };

// export default sendOtp;
import { createTransport } from "nodemailer";
import otpTemplate from "../templates/otp.template.js";

const sendOtp = async (email, subject, otp) => {
  try {
    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // Port 587 uses STARTTLS

      auth: {
        user: process.env.SMTP_GMAIL,
        pass: process.env.SMTP_PASS,
      },

      tls: {
        minVersion: "TLSv1.2",
      },
    });

    console.log("SMTP CONFIG:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_GMAIL,
      secure: false,
    });

    // Verify SMTP connection before sending
    await transporter.verify();

    console.log("SMTP CONNECTION SUCCESS");

    const mailInfo = await transporter.sendMail({
      from: `"SkyCart" <${process.env.SMTP_GMAIL}>`,
      to: email,
      subject: subject,

      // Plain text fallback
      text: `Your SkyCart OTP is: ${otp}. This OTP will expire in 5 minutes.`,

      // HTML email
      html: otpTemplate(otp),
    });

    console.log("EMAIL SENT SUCCESSFULLY:", mailInfo.messageId);

    return mailInfo;
  } catch (error) {
    console.error("SMTP ERROR:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
    });

    throw error;
  }
};

export default sendOtp;