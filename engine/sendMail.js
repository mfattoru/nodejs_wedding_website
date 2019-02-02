const nodemailer = require("nodemailer");
const fs = require('fs');


var send = async (body) => {
    // console.log(JSON.stringify(body));

    var {
        fname,
        lname,
        subject,
        message,
        email
    } = body;
    let account = {
        user: process.env.MAIL_ADDR,
        pass: process.env.MAIL_PWD
    };

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SMTP,
        port: 465,
        secure: true,
        auth: {
            user: account.user,
            pass: account.pass
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

    console.log(`Sending confirmation email to: ${to}`)
    // Returning a promise, so we can handtle the async job
    return new Promise(function (resolve, reject) {
        // Do async job
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(info.response);
            }
        });
    });
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

var sendConfirmation = async (t,participation) => {

    // var {
    //     fname,
    //     lname,
    //     subject,
    //     message,
    //     email
    // } = body;
    let account = {
        user: process.env.MAIL_ADDR,
        pass: process.env.MAIL_PWD
    };

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SMTP,
        port: 465,
        secure: true,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    var template = fs.readFileSync('./data/mail-template.html',"utf8");
    // console.log(template);

    template = template.replace(/%TITLE%/, t('Your participation has been confirmed'));
    template = template.replace(/%INFO%/, participation.numberAdults + t(' Adults and ') + participation.numberChildren + t(' Childrens - Location: ') + t(`${participation.evLocation}`));
    template = template.replace(/%END%/, t('We\'d love for you to be there.'));
    // console.log(template);

    // setup email data with unicode symbols
    let mailOptions = {

        from: `"Michele & Rosa" <${process.env.MAIL_ADDR}>`, // sender address
        // from: `"${fname} ${lname}" <${email}>`, 
        to: `${participation.email}`, // list of receivers
        // to: "juventino990@hotmail.it,info@micheleandrosa.wedding", // list of receivers
        subject: t('Michele & Rosa Wedding'), // Subject line
        // text: `${text}`, // plain text body
        html: template // html body
    };

    // Returning a promise, so we can handtle the async job
    return new Promise(function (resolve, reject) {
        // Do async job
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(info.response);
            }
        });
    });
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
    send,
    sendConfirmation
};