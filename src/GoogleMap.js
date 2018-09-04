'use strict';

function GoogleMap(_options) {
  var options = _options || {};

  this.map = undefined;
  this.marker = undefined;
  this.infowindow = undefined;
  this.messagewindow = undefined;

}

GoogleMap.prototype.initMap = function() {

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

  var limerick1 = {lat: 52.6604 , lng:-8.6373};
  var limerick2 = {lat: 52.6614 , lng:-8.6473};
  var limerick3 = {lat: 52.6654 , lng:-8.6343};
  var limerick4 = {lat: 52.6674 , lng:-8.6273};
  var limerick5 = {lat: 52.6704 , lng:-8.6853};
  var limerick6 = {lat: 52.6504 , lng:-8.6678};
  var blanchardstown1 = {lat:53.3932, lng:- 6.3892}


  this.map = new google.maps.Map(document.getElementById('map'), {
    center: ireland,
    zoom: 6
  });

  var clontarf1 = new google.maps.Marker({
    position: clontarf1,
    map: this.map,
    title: 'Fire reported on Kincoard Rd from this location. Small children needing to be rescued from the third house.',
    icon : './images/fire.png'
  });
  var clontarf2 = new google.maps.Marker({
    position: clontarf2,
    map: this.map,
    title: 'Fire reported on Kincoard Rd from this location.',
    icon : './images/fire.png'
  });
  var clontarf3 = new google.maps.Marker({
    position: clontarf3,
    map: this.map,
    title: 'Fire reported on Kincoard Rd from this location.',
    icon : './images/fire.png'
  });
  var sandymount2 = new google.maps.Marker({
    position: sandymount2,
    map: this.map,
    title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road',
    icon : './images/water.png'
  });
  var sandymount3 = new google.maps.Marker({
    position: sandymount3,
    map: this.map,
    title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road',
    icon : './images/water.png'
  });
  var sandymount4 = new google.maps.Marker({
    position: sandymount4,
    map: this.map,
    title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road',
    icon : './images/water.png'
  });
  var sandymount5 = new google.maps.Marker({
    position: sandymount5,
    map: this.map,
    title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road',
    icon : './images/water.png'
  });
  var sandymount5 = new google.maps.Marker({
    position: sandymount5,
    map: this.map,
    title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road',
    icon : './images/water.png'
  });
  var sandymount6 = new google.maps.Marker({
    position: sandymount6,
    map: this.map,
    title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road',
    icon : './images/water.png'
  });
  var sandymount7 = new google.maps.Marker({
    position: sandymount7,
    map: this.map,
    title: 'Flood reported in Sandymount area from this location. High risk of flooding due to a breach in the sea wall at Strand road',
    icon : './images/water.png'
  });

  var limerick1 = new google.maps.Marker({
    position: limerick1,
    map: map,
    title: 'Flood reported in Bishops Quay area from this location. Several cars and businesses in danger.',
    icon : './images/water.png'
  });
  var limerick2 = new google.maps.Marker({
    position: limerick2,
    map: map,
    title: 'Two children trapped in house here. Flood water rising. Rapid dispatch.',
    icon : './images/water.png'
  });
  var limerick3 = new google.maps.Marker({
    position: limerick3,
    map: map,
    title: 'Elderly man trapped in house. Rapid dispatch required.',
    icon : './images/water.png'
  });
  var limerick4 = new google.maps.Marker({
    position: limerick4,
    map: map,
    title: 'Cars being swept away in this area.',
    icon : './images/water.png'
  });
  var limerick5 = new google.maps.Marker({
    position: limerick5,
    map: map,
    title: 'Received call from elderly farmer concerned for his livestock. ',
    icon : './images/water.png'
  });
  var limerick6 = new google.maps.Marker({
    position: limerick6,
    map: map,
    title: 'Flood reported in Bishops Quay area from this location. Several cars and businesses in danger.',
    icon : './images/water.png'
  });

  var blanchardstown1 = new google.maps.Marker({
    position: blanchardstown1,
    map: map,
    title: 'Received reports of a woman collapsing in the shopping centre. Ambulance has been dispatched.',
    icon : './images/injury.png'
  });

  this.infowindow = new google.maps.InfoWindow({
    content: document.getElementById('form')
  });

  this.messagewindow = new google.maps.InfoWindow({
    content: document.getElementById('message')
  });

  google.maps.event.addListener(this.map, 'click', function(event) {
    this.marker = new google.maps.Marker({
      position: event.latLng,
      map: this.map
    });

    google.maps.event.addListener(this.marker, 'click', function() {
      infowindow.open(this.map, this.marker);
      document.getElementById('form').style.display = "block";
    });
  });
}

module.exports = GoogleMap;
