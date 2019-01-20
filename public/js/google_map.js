
var google;

var locations = [
    ['Main Ceremony', 'Barichara Main Park, Santander, Colombia', 'images/church-icon.png'],
    ['Home', '1704 Ontario Ave, Naperville IL 60563', 'images/house-icon.png'],
    ['His Hometown', 'Via San Nicola del vaglio 8, Lettere Napoli 80050', 'images/house-icon.png'],
    ['Wedding Party', 'Cl. 3 #2-38, Barichara, Santander, Colombia', 'images/party-icon.png'],
    ['Honeymoon', 'Greece', 'images/honeymoon-icon.png'],
];
// var titles = ['Capilla de Santa Barbara',
//               'Our Home'];

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    // var myLatlng = new google.maps.LatLng(40.71751, -73.990922);
    //var myLatlng = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
    //var myLatlng = new google.maps.LatLng(6.634810,-73.224280);
    var myLatlng = new google.maps.LatLng(30.247238, -45.234763);
    // 39.399872
    // -8.224454

    var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 3,

            // The latitude and longitude to center the map (always required)
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            // How you would like to style the map.
            scrollwheel: false,
        styles: [{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}]
    };



    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);



    for (var x = 0; x < locations.length; x++) {
        var geocoder = new google.maps.Geocoder();
        // var self=this;
        // this.title = titles[x];
        // this.address = addresses[x];

        geocoder.geocode( { 'address': locations[x][1]}, positionMArker(x,map) );
    }
}

function positionMArker(addressIndex, map) {
    var geocodeCallBack = function (results, status) {
        var i = addressIndex;
        if (status == 'OK') {
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP,
                title: locations[i][0],
                icon: locations[i][2],
                html: '<div><strong>' + locations[i][0] + '</strong><br>Address: ' + locations[i][1] + '</div>'
            });
            var infowindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, "click", function () {
                infowindow.setContent(this.html);
                infowindow.open(map, this);
            });

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    };
    return geocodeCallBack;
}



google.maps.event.addDomListener(window, 'load', init);
