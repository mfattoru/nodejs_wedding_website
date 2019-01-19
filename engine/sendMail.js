const nodemailer = require("nodemailer");

var send = async (body) => {
    console.log(JSON.stringify(body));

    var {fname,lname,subject,message,email} = body;
    let account = {
        user: process.env.MAIL_ADDR,
        pass: process.env.MAIL_PWD
    }
      
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SMTP,
        port: 465,
        secure: true,
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        
        from: `"${fname} ${lname} - ${email}" <${process.env.MAIL_ADDR}>`, // sender address
        // from: `"${fname} ${lname}" <${email}>`, 
        to: `${process.env.MAIL_ADDR}`, // list of receivers
        // to: "juventino990@hotmail.it,info@micheleandrosa.wedding", // list of receivers
        subject: `${subject}`, // Subject line
        text: `${message}`, // plain text body
        replyTo: `${email}`
        // html: "<b>Hello world?</b>" // html body
    };

    // Returning a promise, so we can handtle the async job
    return new Promise(function(resolve, reject) {
    	// Do async job
        transporter.sendMail(mailOptions,function(error, info){
            if (error) {
                reject(error);
            } else {
                resolve(info.response);
            }
        })
    })
    // // send mail with defined transport object
    // let info = await transporter.sendMail(mailOptions,function(error, info){
    //     if (error) {
    //         // TODO: Handle the case when The mail isn't successfully sent
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });

}

module.exports = {
    send
}