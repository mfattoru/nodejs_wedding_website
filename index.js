require('dotenv').config();
const express = require('express');
const app = express();
const gallery = require('./engine/galleryCreator');
const participation = require('./engine/participation');
const twitter = require('./engine/twitter_bot');

const sendMail = require('./engine/sendMail');

const tableify = require('tableify');
const i18nextXHRBackend = require('i18next-xhr-backend');
const fs = require('fs');

// const i18n = require('./engine/i18n')
// const cookieParser = require('cookie-parser');
// const i18n = require('i18n-2');

const i18n = require('i18next');
const i18nFsBackend = require('i18next-node-fs-backend');
const i18nMiddleware = require('i18next-express-middleware');

var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

// app.use(i18n);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// var options = {
//     // order and from where user language should be detected
//     order: [/*'path', 'session', */ 'querystring', 'cookie', 'header'],

//     // keys or params to lookup language from
//     lookupQuerystring: 'lng',
//     lookupCookie: 'i18next',
//     lookupSession: 'lng',
//     lookupPath: 'lng',
//     lookupFromPathIndex: 0,

//     // cache user language
//     caches: false, // ['cookie']

//     // optional expire and domain for set cookie
//     cookieExpirationDate: new Date(),
//     cookieDomain: 'myDomain',
//     cookieSecure: true // if need secure cookie
// }

i18n
    .use(i18nextXHRBackend) //Allows to use i18next on client through JQuery
    .use(i18nFsBackend) //Used to interface i18next with express
    .use(i18nMiddleware.LanguageDetector) //Used to detect the language
    .init({
        backend: {
            loadPath: __dirname + '/locales/{{lng}}.json',
            // addPath: __dirname + '/locales/{{lng}}.missing.json'
            addPath: __dirname + '/locales/{{lng}}.json'
        },
        fallbackLng: 'en',
        lowerCaseLng: true,
        preload: ['en', 'es', 'it'],
        saveMissing: true,
        keySeparator: false,
        // detection: options
    });

app.use(i18nMiddleware.handle(i18n, {
    removeLngFromUrl: false
}));

// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     // if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {

//         return res.redirect('https://' + process.env.HOST + req.url);
//     }
//     next();
// }

// app.use(requireHTTPS);



// app.get('/locales/:lang', (req, res) => {
//     var lang = req.params.lang;
//     var file = fs.readFileSync(`locales/${lang}.json`);
//     res.send(file);
// });

// app.get('/changelang/:lang/:redirect', (req, res) => {
//     var lang = req.params.lang;
//     var redirect = req.params.redirect
//     // var file = fs.readFileSync(`locales/${lang}.json`);
//     i18n
//         .changeLanguage(lang)
//         .then((t) => {
//             console.log(t('Wedding')); // -> same as i18next.t
//         });

//         // console.log(i18n);
//     console.log(lang);
//     console.log(redirect);
//     res.redirect(redirect);

// });
// i18next
//   .changeLanguage('en')
//   .then((t) => {
//     t('key'); // -> same as i18next.t
//   });

app.get('/minutes', (req, res) => {
    res.send({
        days: req.t('day'),
        hours: req.t('hour'),
        minutes: req.t('minute'),
        seconds: req.t('second'),
        pluralLetter: req.t('pluralLetter')
    });
});

// app.get('/test', (req, res) => {
//     twitter.getTweets().then( (result) =>{
//         res.render('test',{tweets: result});
//     });
//     // res.render('test');
//     // res.send("Hello Test!")
//     // res.send(req.t('Wedding'));
// });

// app.get('/index.php', function (req, res,next) {  //to run attached to the apache server
app.get('/', function (req, res, next) {
    console.log("ROOT: "+req.t('Wedding'));
    console.log(req.acceptsLanguages());
    twitter.getTweets().then((tweets) => {
        res.render('index', {
            gallery: gallery.galleryCreator('public/images/gallery', req.t),
            tweets
        });
    }).catch((err) => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        console.log(error);
        res.render('index', {
            gallery: gallery.galleryCreator('public/images/gallery', req.t),
            tweets: ""
        });
    });

});

app.get('/gallery', function (req, res, next) {
    res.render('gallery', {
        gallery: gallery.galleryCreator('public/images/gallery', req.t)
    });
});

app.get('/about', function (req, res, next) {
    res.render('about');
});

app.get('/contact', function (req, res, next) {
    res.render('contact');
});

app.get('/services', function (req, res, next) {
    res.render('services');
});

app.get('/where', function (req, res, next) {
    res.render('where');
});

app.post('/addAttendant', function (req, res) {
    var {
        name,
        numberAdults,
        numberChildren,
        email,
        overwrite,
        participating
    } = req.body;
    // console.log("User name = "+req.body.name +", mail is "+req.body.email +" number is "+req.body.number+"and overwrite is "+ req.body.overwrite);
    try {
        var foundDuplicates = participation.addParticipation(name, numberAdults, numberChildren, email, overwrite);
        if( participating === 'true'){
            if (foundDuplicates === true) {
                res.send({
                    status: "duplicates",
                    text: req.t("Do you want to update it?"),
                    title: req.t("Participation Already Available"),
                    confirmButton: req.t("YES"),
                    cancelButton: req.t("NO")
                });
            } else {
                res.send({
                    status: "done",
                    text: req.t("Thank you for notifying us"),
                    title: req.t("Participation Saved")
                });
            }
        }else{  //telling us they won't participate
            if (foundDuplicates === true) {
                res.send({
                    status: "duplicates",
                    text: req.t("Are you sure you don't want to participate anymore?"),
                    title: req.t("Participation Already Available"),
                    confirmButton: req.t("YES"),
                    cancelButton: req.t("NO")
                });
            } else {
                res.send({
                    status: "done",
                    text: req.t("We are sorry you can't make it. If you change your mind, come update your registration through your email!"),
                    title: req.t("Participation Saved")
                });
            }
        }
    } catch (err) {
        res.send({
            status: "error",
            title: req.t("Participation Not Saved"),
            text: req.t("Please try again in few minutes!")
        });
    }
});


app.post('/sendMail', function (req, res) {
    // var {fname,lname,subject,message,email} = req.body;
    // console.log("User name = "+req.body.name +", mail is "+req.body.email +" number is "+req.body.number+"and overwrite is "+ req.body.overwrite);
    // console.log(JSON.stringify(req.body));
    // foo(req.body, function(res){
    //     alert(location); // this is where you get the return value
    // });

    // const start = async function(r) {
    //     const result = await sendMail.send(r.body);;
    //     res.send({status:"ok",text:r.t("Message Sent Successfully!")})
    //     console.log("Message Sent Successfully!");
    // }
    // start(req);
    var sendPromise = sendMail.send(req.body);
    sendPromise.then((result) => {
        console.log("Mail sent successfully");
        console.log(result);
        res.send({
            status: "ok",
            text: req.t("Message Sent Successfully!")
        });
    }).catch((err) => {
        res.send({
            status: "error",
            text: req.t("An error occurred while sending the email, please try again!")
        });
        console.log(err);
    });
    // await sendMail.send(req.body);
    // res.send({status:"ok",text:req.t("Message Sent Successfully!")})
});

app.get('/participationlist', function (req, res) {
    var participations = participation.getAll();
    var total = participation.totalParticipants();
    res.render('participationlist', {
        table: tableify(participations),
        total: tableify(total)
    });
});

app.get('/downloadlist', function (req, res) {
    res.download('./data/participations-data.csv', 'participations-data.csv');
});

app.get('/sitemap', function (req, res) {
    res.download('./data/sitemap.xml', 'sitemap.xml');
});

// Handle 404 - Keep this as a last route
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

app.listen(process.env.PORT, function () { //for the configuration on the website
    console.log(`Example app listening on port ${process.env.PORT}!`);
});