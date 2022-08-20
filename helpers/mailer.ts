import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export async function sendmail(msg: string, subject: any, reciever: string) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            }
        })
        const mailOptions = {
            from: "Digital SuperStore",
            to: reciever,
            subject: subject,
            html: msg,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent: ${info.response}`);
            }
        });
    }
    catch (err) {
        return err
    }
}