const express = require('express');
const app = express();
const gallery = require('./engine/galleryCreator');
const participation = require('./engine/participation')
const tableify = require('tableify');


var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// app.get('/index.php', function (req, res,next) {  //to run attached to the apache server
app.get('/', function (req, res,next) {
    res.render('index',{ gallery: gallery.galleryCreator('public/images/gallery') });
});

app.get('/gallery', function (req, res,next) {
    res.render('gallery',{ gallery: gallery.galleryCreator('public/images/gallery') });
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
    // console.log("User name = "+req.body.name +", mail is "+req.body.email +" number is "+req.body.number+"and overwrite is "+ req.body.overwrite);
    var foundDuplicates = participation.addParticipation(req.body.name,req.body.number,req.body.email,req.body.overwrite);
    if( foundDuplicates === true ){
        res.end("duplicates");
    }else{
        res.end("done");
    }
    // res.send('You sent the name "' + req.body.name + '".');
});

app.get('/participationlist', function(req, res){
    console.log('partecipation list');
    var participations = participation.getAll();
    var totalParticipants=participation.totalParticipants();
    res.render('participationlist',{ table: tableify(participations), total:totalParticipants});
});

app.get('/downloadlist', function(req, res){
    res.download('./data/participations-data.csv','participations-data.csv');
    // res.send(tableify());
});

//app.listen(50122, function () {  //for the configuration on the website
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
