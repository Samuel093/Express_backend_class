import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const sendEmail = async ({email, otp})=>{
    try {
        const info = await transporter.sendMail({
            from: '"No Reply" <areosamuel093@gmail.com>',
            to: email,
            subject: 'Password Reset',
            html: `Your otp is <strong>${otp}</strong>, it expires in 15 minutes`
        });
        console.log("Message sent:", info.messageId);
        return info.messageId
    } catch (error) {
          console.log("Message not sent:", error.message);
          return error.message
    }
}
