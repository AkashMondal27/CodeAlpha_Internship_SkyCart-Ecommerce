import { Resend } from "resend";
import otpTemplate from "../templates/otp.template.js";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOtp = async (email, subject, otp) => {
    try {
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: [email],
            subject: subject,
            text: `Your SkyCart OTP is: ${otp}. This OTP will expire in 5 minutes.`,
            html: otpTemplate(otp),
        });

        if (error) {
            console.error("Resend email error:", error);
            throw new Error(error.message || "Failed to send email");
        }

        console.log("OTP email sent successfully:", data?.id);

        return data;
    } catch (error) {
        console.error("Failed to send OTP:", error);
        throw error;
    }
};

export default sendOtp;





// // This Nodemailer code which cannot run on free Render Development 

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