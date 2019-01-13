// function getMatchingWords(value, callback) {
//     $.ajax('http://127.0.0.1:3000/galleryCreator', {
//         type: 'GET',
//         dataType: 'html',
//         success: function(data) { if ( callback ) callback(data); },
//         error  : function()     { if ( callback ) callback(null); }
//     });
// }

$.get( "http://localhost:3000/galleryCreator", function( data ) {
  document.getElementById("fh5co-gallery-list").innerHTML = data;
});
