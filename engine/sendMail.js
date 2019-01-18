const nodemailer = require("nodemailer");

var send = async (body) => {
    console.log(JSON.stringify(body));

    var {fname,lname,subject,message,email} = body;

    let account = {
        user: "info@micheleandrosa.wedding",
        pass: process.env.MAIL_PWD
    }
      
    let transporter = nodemailer.createTransport({
        host: "mail.micheleandrosa.wedding",
        port: 465,
        secure: true,
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        
        from: `"${fname} ${lname} - ${email}" <info@micheleandrosa.wedding>`, // sender address
        // from: `"${fname} ${lname}" <${email}>`, 
        to: "michele.fattoruso@gmail.com, rosaruedave@gmail.com, info@micheleandrosa.wedding", // list of receivers
        // to: "juventino990@hotmail.it,info@micheleandrosa.wedding", // list of receivers
        subject: `${subject}`, // Subject line
        text: `${message}`, // plain text body
        replyTo: `${email}`
        // html: "<b>Hello world?</b>" // html body
    };

    console.log("Almost Finished");
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions,function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          console.log(JSON.stringify(info));
        }
    });

}

module.exports = {
    send
}