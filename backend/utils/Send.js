
const nodemailer = require('nodemailer'); // Ensure nodemailer is required

async function sendPasswordByEmail(email, firstName, password) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your Account Has Been Created",
        html: `<p>Hello ${firstName}, your account has been created. Your password is <b>${password}</b></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}`);
    } catch (error) {
        console.log(`Failed to send email to ${email}`, error);
    }
}

module.exports = sendPasswordByEmail;
