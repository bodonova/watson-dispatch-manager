var map;
var marker;
var infowindow;
var messagewindow;

function initMap() {

    var ireland = {lat:53.45, lng:-7.8515377}
    var clontarf1 = {lat: 53.3606109, lng: -6.1834204};
    var clontarf2 = {lat : 53.3613312, lng: -6.1833206}
    var clontarf3 = {lat : 53.361203, lng: -6.1833216}
    var limerick = {lat: 53.2734, lng: 131.044};
    var sandymount1 = {lat: 53.329633, lng:-6.210746 };
    var sandymount2 = {lat: 53.326699, lng:-6.210814 };
    var sandymount3 = {lat: 53.329228, lng:-6.210944 };
    var sandymount4 = {lat: 53.329813, lng:-6.210629 };
    var sandymount5 = {lat: 53.329512, lng:-6.210442 };
    var sandymount6 = {lat: 53.329496, lng:-6.210213 };
    var sandymount7 = {lat: 53.329433, lng:-6.210123 };

    map = new google.maps.Map(document.getElementById('map'), {
      center: ireland,
      zoom: 6
    });

    var clontarf1 = new google.maps.Marker({
      position: clontarf1,
      map: map,
      title: 'Fire reported on Kincoard Rd from this location. Small children needing to be rescued from the third house.',
      icon : './images/fire.png'
    });
    var clontarf2 = new google.maps.Marker({
      position: clontarf2,
      map: map,
      title: 'Fire reported on Kincoard Rd from this location.'
    });
    var clontarf3 = new google.maps.Marker({
      position: clontarf3,
      map: map,
      title: 'Fire reported on Kincoard Rd from this location.'
    });
    var sandymount2 = new google.maps.Marker({
      position: sandymount2,
      map: map,
      title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road'
    });
    var sandymount3 = new google.maps.Marker({
      position: sandymount3,
      map: map,
      title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road'
    });
    var sandymount4 = new google.maps.Marker({
      position: sandymount4,
      map: map,
      title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road'
    });
    var sandymount5 = new google.maps.Marker({
      position: sandymount5,
      map: map,
      title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road'
    });
    var sandymount5 = new google.maps.Marker({
      position: sandymount5,
      map: map,
      title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road'
    });
    var sandymount6 = new google.maps.Marker({
      position: sandymount6,
      map: map,
      title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road'
    });
    var sandymount7 = new google.maps.Marker({
      position: sandymount7,
      map: map,
      title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road'
    });




    infowindow = new google.maps.InfoWindow({
      content: document.getElementById('form')
    });

    messagewindow = new google.maps.InfoWindow({
      content: document.getElementById('message')
    });

    google.maps.event.addListener(map, 'click', function(event) {
      marker = new google.maps.Marker({
        position: event.latLng,
        map: map
      });


      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
        document.getElementById('form').style.display = "block";
      });
    });
  }

  function saveData() {
    var name = escape(document.getElementById('name').value);
    var address = escape(document.getElementById('address').value);
    var type = document.getElementById('type').value;
    var latlng = marker.getPosition();
    var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
    					'&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();
    
    downloadUrl(url, function(data, responseCode) {
    
      if (responseCode == 200 && data.length <= 1) {
      	infowindow.close();
      	messagewindow.open(map, marker);
      }
    });
  }
  
  function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;
    
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        request.onreadystatechange = doNothing;
        callback(request.responseText, request.status);
      }
    };
    
    request.open('GET', url, true);
    request.send(null);
  }
  
  function doNothing () {
  }

// Variables
exports.map = map;
exports.marker = marker;
exports.infowindow = infowindow;
exports.messagewindow = messagewindow;

// Functions
exports.initMap = initMap;
exports.saveData = saveData;
exports.downloadUrl = downloadUrl;
