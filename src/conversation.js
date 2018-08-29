
// a global context variable so we remember it between calls
var context = {};

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
      context = data.context; // store for future calls
      $('#response textarea').val(data.output.text);
    }
  };

  // Send request
  var params = JSON.stringify(payloadToWatson);
  http.send(params);
}

exports.context = context;
exports.conv_init = conv_init;
