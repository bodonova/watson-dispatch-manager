'use strict';

var $ = require('jquery');
var scrolled = false,
    textScrolled = false;

var showTimestamp = function(timestamps, confidences) {
  var word = timestamps[0],
      t0 = timestamps[1],
      t1 = timestamps[2];
  var timelength = t1 - t0;
  // Show confidence if defined, else 'n/a'
  var displayConfidence = confidences ? confidences[1].toString().substring(0, 3) : 'n/a';
  $('#metadataTable > tbody:last-child').append(
      '<tr>'
      + '<td>' + word + '</td>'
      + '<td>' + t0 + '</td>'
      + '<td>' + t1 + '</td>'
      + '<td>' + displayConfidence + '</td>'
      + '</tr>'
      );
}


var showMetaData = function(alternative) {
  var confidenceNestedArray = alternative.word_confidence;;
  var timestampNestedArray = alternative.timestamps;
  if (confidenceNestedArray && confidenceNestedArray.length > 0) {
    for (var i = 0; i < confidenceNestedArray.length; i++) {
      var timestamps = timestampNestedArray[i];
      var confidences = confidenceNestedArray[i];
      showTimestamp(timestamps, confidences);
    }
    return;
  } else {
    if (timestampNestedArray && timestampNestedArray.length > 0) {
      timestampNestedArray.forEach(function(timestamp) {
        showTimestamp(timestamp);
      });
    }
  }
}

var Alternatives = function(){

  var stringOne = '',
    stringTwo = '',
    stringThree = '';

  this.clearString = function() {
    stringOne = '';
    stringTwo = '';
    stringThree = '';
  };

  this.showAlternatives = function(alternatives, isFinal, testing) {
    var $hypotheses = $('.hypotheses ol');
    $hypotheses.empty();
    // $hypotheses.append($('</br>'));
    alternatives.forEach(function(alternative, idx) {
      var $alternative;
      if (alternative.transcript) {
        var transcript = alternative.transcript.replace(/%HESITATION\s/g, '');
        transcript = transcript.replace(/(.)\1{2,}/g, '');
        switch (idx) {
          case 0:
            stringOne = stringOne + transcript;
            $alternative = $('<li data-hypothesis-index=' + idx + ' >' + stringOne + '</li>');
            break;
          case 1:
            stringTwo = stringTwo + transcript;
            $alternative = $('<li data-hypothesis-index=' + idx + ' >' + stringTwo + '</li>');
            break;
          case 2:
            stringThree = stringThree + transcript;
            $alternative = $('<li data-hypothesis-index=' + idx + ' >' + stringThree + '</li>');
            break;
        }
        $hypotheses.append($alternative);
      }
    });
  };
}

var alternativePrototype = new Alternatives();

// TODO: Convert to closure approach
var processString = function(baseString, isFinished) {

  if (isFinished) {
    var formattedString = baseString.slice(0, -1);
    formattedString = formattedString.charAt(0).toUpperCase() + formattedString.substring(1);
    formattedString = formattedString.trim() + '.';
    $('#resultsText').val(formattedString);
  } else {
    $('#resultsText').val(baseString);
  }


  if(baseString.indexOf("flood") >= 0){
    document.getElementById("match_flood").style.display = 'block'; 
    map.setCenter(new google.maps.LatLng(53.329633, -6.210746))
    map.setZoom(15);
  }


  if(baseString.indexOf("fire") >= 0){
    document.getElementById("match_fire").style.display = 'block'; 
    map.setCenter(new google.maps.LatLng(53.3606109, -6.1843204))
    map.setZoom(15);
  }


}

exports.showJSON = function(msg, baseJSON) {

   var json = JSON.stringify(msg, null, 2);
    baseJSON += json;
    baseJSON += '\n';

  if ($('.nav-tabs .active').text() == "JSON") {
      $('#resultsJSON').append(baseJSON);
      baseJSON = "";
      console.log("updating json");
  }

  return baseJSON;
}

function updateTextScroll(){
  if(!scrolled){
    var element = $('#resultsText').get(0);
    element.scrollTop = element.scrollHeight;
  }
}

var initTextScroll = function() {
  $('#resultsText').on('scroll', function(){
      textScrolled = true;
  });
}

function updateScroll(){
  if(!scrolled){
  // L.R.
  //  var element = $('.table-scroll').get(0);
  //  element.scrollTop = element.scrollHeight;
  }
}

// L.R.
// --------------------------------- MT & TTS ----------------------------------------
function getVoice() {
	var mt_target = getTargetLanguageCode();
	var voice = '';
	if(mt_target == 'en')
		voice = 'en-US_MichaelVoice'; // TODO: try 'en-US_AllisonVoice' or 'en-US_LisaVoice'
	else if(mt_target == 'fr')
		voice = 'fr-FR_ReneeVoice';
	else if(mt_target == 'es')
		voice = 'es-US_SofiaVoice';   // TODO: try 'es-ES_EnriqueVoice' or 'es-ES_LauraVoice'
	else if(mt_target == 'pt')
		voice = 'pt-BR_IsabelaVoice';
	return voice;
}

function TTS(textToSynthesize) {
	console.log('text to synthesize: ---> ' + textToSynthesize);
	var voice = getVoice();
	if(voice == '')
		return;
	synthesizeRequest(textToSynthesize, voice);
}

function getTargetLanguageCode() {
	var lang = $('#dropdownMenuTargetLanguageDefault').text();
	var mt_target = 'en'; // default
	if( lang == 'English' )
	    mt_target = 'en';
	else if( lang == 'French' )
	    mt_target = 'fr';
	else if( lang == 'Spanish' )
	    mt_target = 'es';
	else if( lang == 'Portuguese' )
	    mt_target = 'pt';
	return mt_target;
}


function converse (textContent) {
  console.log("Sending text to conversation: \'"+textContent+"\'");
  // Build request payload
  var payloadToWatson = {};
  payloadToWatson.input = { text: textContent };
  payloadToWatson.context = context;
  console.log("meaasge payload: "+JSON.stringify(payloadToWatson));

  // Built http request
  var http = new XMLHttpRequest();
  http.open('POST', '/message', true);
  http.setRequestHeader('Content-type', 'application/json');
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200 && http.responseText) {
      console.log ('response='+http.responseText);
      var data =  JSON.parse(http.responseText);
      context = data.context; // store for future calls
      $('#response textarea').val(data.output.text);
      TTS(data.output.text);
    }
  };

  // Send request
  var params = JSON.stringify(payloadToWatson);
  http.send(params);
}


var ttsAudio = $('.audio-tts').get(0);

$('#playTTS').click(function() {
  var textContent = $('#resultsText').val();
  // ToDo indicate the confidence of the transcriotion e.g.
  $('#response textarea').val('');
  converse(textContent);
});

$('#stopTTS').click(function() {
	ttsAudio.pause();
});

window.ttsChunks = new Array();
window.ttsChunksIndex = 0;
window.inputSpeechOn = false;

var timerStarted = false;
var timerID;

var playTTSChunk = function() {
	if(ttsChunksIndex >= ttsChunks.length)
		return;

	var downloadURL = ttsChunks[ttsChunksIndex];
	ttsChunksIndex = ttsChunksIndex + 1;

	ttsAudio.src = downloadURL;
	ttsAudio.load();
	ttsAudio.play();
}

ttsAudio.addEventListener('ended', playTTSChunk);

function playTTSifInputSpeechIsOff() {
	clearTimeout(timerID);
	var streaming = $('#microphone_streaming').prop('checked');

	if(streaming== false && inputSpeechOn == true || ttsAudio.paused == false) {
		timerID = setTimeout(playTTSifInputSpeechIsOff, 100);
		timerStarted = true;
	}
	else {
		timerStarted = false;
		playTTSChunk();
	}
}

function synthesizeRequest(text, v) {
	var downloadURL = '/synthesize' +
	  '?voice=' + v +
	  '&text=' + encodeURIComponent(text);

	ttsChunks.push(downloadURL);

	if(timerStarted == false) {
		timerID = setTimeout(playTTSifInputSpeechIsOff, 300);
		timerStarted = true;
	}
}

// ------------------------------------------------------------------------------------

var initScroll = function() {
  $('.table-scroll').on('scroll', function(){
      scrolled=true;
  });
}

exports.initDisplayMetadata = function() {
  initScroll();
  initTextScroll();
};


exports.showResult = function(msg, baseString, callback) {

  var idx = +msg.result_index;

  if (msg.results && msg.results.length > 0) {

    var alternatives = msg.results[0].alternatives;
    var text = msg.results[0].alternatives[0].transcript || '';

	// L.R.
	// console.log('transcription: ---> ' + text);

    //Capitalize first word
    // if final results, append a new paragraph
    if (msg.results && msg.results[0] && msg.results[0].final) {
      baseString += text;
      var displayFinalString = baseString;
      displayFinalString = displayFinalString.replace(/%HESITATION\s/g, '');
      displayFinalString = displayFinalString.replace(/(.)\1{2,}/g, '');
      processString(displayFinalString, true);

  	  // HACK to ignore nn, nnn, nnnn sequences !!!
      // ToDo figure out is we should skip this test and always send
  	  console.log('---> recognised=' + text);
      console.log('---> confidence='+ (100*msg.results[0].alternatives[0].confidence) + '%');
  	  var res = text.match("([n]{2,} )");
  	  if(res == null) {
  		    converse(text);
  	  } else {
  		    console.log('---> conversation step is skipped for text=' + text);
  	  }
    }
	else {
      var tempString = baseString + text;
      tempString = tempString.replace(/%HESITATION\s/g, '');
      tempString = tempString.replace(/(.)\1{2,}/g, '');
      processString(tempString, false);
    }
  }

  updateScroll();
  updateTextScroll();
  return baseString;

};

$.subscribe('clearscreen', function() {
  var $hypotheses = $('.hypotheses ul');
  scrolled = false;
  $hypotheses.empty();
  alternativePrototype.clearString();
});
