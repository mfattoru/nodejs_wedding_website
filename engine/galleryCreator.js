// var html='';
var filesystem = require("fs");
var path = require('path');
const readline = require('readline');
// const express = require('express');
// const app = express();
var exports = module.exports = {};



var galleryCreator = (dir, tr) => {
    // exports.galleryCreator = function( dir ) {
    html = '';

    filesystem.readdirSync(dir).forEach(function (file) {
        var fileName = file;
        // console.log(`FILENAME: ${fileName}`);
        file = dir + '/' + file;
        // console.log(file);
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            //need to get the folder background image. like a static name in that specific folder
            html += '<li class="one-third animate-box fadeIn animate-fast" data-animate-effect="fadeIn" style="background-image: url(\'' + file.replace('public/', '') + '/background.jpg\'); ">';
            html += '<div id="' + fileName.replace(/ /g, "-") + '" class="hidden">';

            var numOfFiles = getAllFilesFromFolder(file);

            html += '</div>';
            html += '<a href="#' + fileName.replace(/ /g, "-") + '"  class="btn-gallery">';
            html += '<div class="case-studies-summary">';
            html += '<span>' + numOfFiles + ' Photos</span>';
            //Each gallery folder name is leaded by a number and a space,which is used to order the gallery (at least on unix readdir)
            html += '<h2>' + tr(fileName.replace(/^\d+ /, "")) + '</h2>';
            html += '</div>';
            html += '</a>';
            html += '</li>';
        }

    });
    return html;
};

var getAllFilesFromFolder = (dir) => {

    // var filesystem = require("fs");
    var numOfFiles = 0;

    filesystem.readdirSync(dir).forEach(function (file) {

        file = dir + '/' + file;
        
        if(file.substring(file.lastIndexOf('/')+1) === "background.jpg"){
            return;
        }
        var stat = filesystem.statSync(file);
        var fileExt = path.extname(file);
        // console.log(file);
        //console.log(fileExt);
        if (fileExt === '.txt') {
            //console.log("entered");
            var lines = filesystem.readFileSync(file, 'utf-8').split('\n').filter(Boolean);

            lines.forEach(function (line) {
                var url;
                var title;
                [url,title] = line.split(",");
                if(title == null){
                    html += '<a href="' + url + '"></a>';
                }else{
                    html += '<a href="' + url + '" title="'+title+'"></a>';
                }
                numOfFiles++;
            });
            // for(var line in lines){
            //     html += '        <a href="'+line+'"></a>';
            //     console.log(lines);
            // }
            //Asynctonous read not needed here
            // var lineReader = readline.createInterface({
            //     input: filesystem.createReadStream(file)
            //     // crlfDelay: Infinity
            // });
            // lineReader.on('line', function (line) {
            //     html += '        <a href="'+line+'"></a>';
            //     //console.log(line);
            // });
        } else {
            if (stat && !stat.isDirectory()) {
                html += '<a href="' + file.replace('public/', '') + '"></a>';
                numOfFiles++;
            }
        }

    });

    return numOfFiles;

};

module.exports = {
    galleryCreator
};