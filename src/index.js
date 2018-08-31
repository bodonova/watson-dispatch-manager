/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*global $:false */

'use strict';


// a global context variable so we remember it between calls
var context = {};

const $ = require('jquery');

const GoogleMap = require('./GoogleMap');
const googleMap = new(GoogleMap);
window.initMap = googleMap.initMap;
window.map = googleMap.map;

var models = require('./data/models.json').models;
var utils = require('./utils');
utils.initPubSub();
var initViews = require('./views').initViews;

window.BUFFERSIZE = 8192;

$(document).ready(function() {

  // Make call to API to try and get token
  utils.getToken(function(token) {

    window.onbeforeunload = function(e) {
      localStorage.clear();
    };

    if (!token) {
      console.error('No authorization token available');
      console.error('Attempting to reconnect...');
    }

    var viewContext = {
      currentModel: 'en-US_BroadbandModel',
      models: models,
      token: token,
      bufferSize: BUFFERSIZE
    };

    initViews(viewContext);

    // Save models to localstorage
    localStorage.setItem('models', JSON.stringify(models));

    // Set default current model
    localStorage.setItem('currentModel', 'en-US_BroadbandModel');
    localStorage.setItem('sessionPermissions', 'true');


    $.subscribe('clearscreen', function() {
      $('#resultsText').text('');
      $('#resultsJSON').text('');
      $('.error-row').hide();
      $('.notification-row').hide();
      $('.hypotheses > ul').empty();
      $('#metadataTableBody').empty();
    });

  });

  console.log ("Initializing the conversation service");
  conv_init();

});


function conv_init () {
  console.log("Initialising conversation");
  // Build request payload
  var payloadToWatson = {"text": " " , "context": {} };
  console.log("meaasge payload: "+JSON.stringify(payloadToWatson));

  // Built http request
  var http = new XMLHttpRequest();
  http.open('POST', '/message', true);
  http.setRequestHeader('Content-type', 'application/json');
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200 && http.responseText) {
      console.log ('response='+http.responseText);
      var data =  JSON.parse(http.responseText);
      window.context = data.context; // store for future calls
      $('#response textarea').val(data.output.text);
    }
  };

  // Send request
  var params = JSON.stringify(payloadToWatson);
  http.send(params);
}
