require('dotenv').config();
const express = require('express');
const app = express();
const gallery = require('./engine/galleryCreator');
const participation = require('./engine/participation')
console.log("PWD: "+JSON.stringify(process.env.MAIL_PWD));
const sendMail = require('./engine/sendMail')

const tableify = require('tableify');
const i18nextXHRBackend = require('i18next-xhr-backend');
const fs = require('fs');

// const i18n = require('./engine/i18n')
// const cookieParser = require('cookie-parser');
// const i18n = require('i18n-2');
const PORT = 50122;

const i18n = require('i18next');
const i18nFsBackend = require('i18next-node-fs-backend');
const i18nMiddleware = require('i18next-express-middleware');

var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

// app.use(i18n);

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


i18n
    .use(i18nextXHRBackend)     //Allows to use i18next on client through JQuery
    .use(i18nFsBackend)         //Used to interface i18next with express
    .use(i18nMiddleware.LanguageDetector)       //Used to detect the language
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
        keySeparator: false
    });

app.use(i18nMiddleware.handle(i18n, {
    removeLngFromUrl: false
}));


app.get('/locales/:lang', (req, res) => {
    var lang = req.params.lang;
    var file = fs.readFileSync(`locales/${lang}.json`);
    res.send(file);
});

app.get('/minutes', (req, res) => {
    res.send({
        days: req.t('day'),
        hours: req.t('hour'),
        minutes: req.t('minute'),
        seconds: req.t('second'),
        pluralLetter: req.t('pluralLetter')
    });
});

app.get('/test', (req, res) => {
    res.render('test');
    // res.send(req.t('Wedding'));
});

// app.get('/index.php', function (req, res,next) {  //to run attached to the apache server
app.get('/', function (req, res,next) {
    // console.log(req.__('Hello'));
    res.render('index',{ gallery: gallery.galleryCreator('public/images/gallery',req.t) });
});

app.get('/gallery', function (req, res,next) {
    res.render('gallery',{ gallery: gallery.galleryCreator('public/images/gallery',req.t) });
});

app.get('/about', function (req, res,next) {
    res.render('about');
});

app.get('/contact', function (req, res,next) {
    res.render('contact');
});

app.get('/services', function (req, res,next) {
    res.render('services');
});

app.post('/addAttendant', function(req, res) {
    var {name,numberAdults,numberChildren,email,overwrite} = req.body;
    // console.log("User name = "+req.body.name +", mail is "+req.body.email +" number is "+req.body.number+"and overwrite is "+ req.body.overwrite);
    try{
        var foundDuplicates = participation.addParticipation(name,numberAdults,numberChildren,email,overwrite);
        
        if( foundDuplicates === true ){
            res.send({status:"duplicates",text:req.t("Participation updated")});
        }else{
            res.send({status:"done",text:req.t("Participation saved")})
        }
    }catch(err){
        res.send({status:"error",text:req.t("Participation NOT saved, try again!")})
    }
});

app.post('/sendMail', function(req, res) {
    // var {fname,lname,subject,message,email} = req.body;
    // console.log("User name = "+req.body.name +", mail is "+req.body.email +" number is "+req.body.number+"and overwrite is "+ req.body.overwrite);
    // console.log(JSON.stringify(req.body));
    //try{
        sendMail.send(req.body)
        res.send({status:"ok",text:req.t("Email Successfully Sent")});
    // }catch(err){
    //     res.send({status:"error",text:req.t("An error occurred while sending the email, please try again!")})
    // }
});

app.get('/participationlist', function(req, res){
    console.log('partecipation list');
    var participations = participation.getAll();
    var total = participation.totalParticipants();
    res.render('participationlist',{ table: tableify(participations), total:tableify(total) });
});

app.get('/downloadlist', function(req, res){
    res.download('./data/participations-data.csv','participations-data.csv');
    // res.send(tableify());
});

app.listen(PORT, function () {  //for the configuration on the website
// app.listen(3000, function () {
    console.log(`Example app listening on port ${PORT}!`)
});
