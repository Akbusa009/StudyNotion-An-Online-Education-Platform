const nodemailer = require("nodemailer");
const fs = require('fs');

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                 //add certification
                 port: 465,
                 secure: true,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
                tls: {
                rejectUnauthorized: false, // Accept self-signed certificates
                // If you're using a different certificate, specify the key and cert files
                key: fs.readFileSync('path/to/key.pem'),
                cert: fs.readFileSync('path/to/cert.pem'),
                },
            })


            let info = await transporter.sendMail({
                from: 'StudyNotion || Akshay busa',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error);
        //throw right error
        throw error;
    }
}


module.exports = mailSender;