
const $ = require('jquery');
var initPlaySample = require('./playsample').initPlaySample;

exports.initSelectModel = function(ctx) {

  function isDefault(model) {
    return model === 'en-US_BroadbandModel';
  }

  ctx.models.forEach(function(model) {
    $("#dropdownMenuList").append(
      $("<li>")
        .attr('role', 'presentation')
        .append(
          $('<a>').attr('role', 'menu-item')
            .attr('href', '/')
            .attr('data-model', model.name)
            .append(model.description)
          )
      )
  });

  function onChooseTargetLanguageClick() {
    	var currentModel = localStorage.getItem('currentModel') || 'en-US_BroadbandModel';
  	var list = $("#dropdownMenuTargetLanguage");
  	list.empty();
  	if(currentModel == 'en-US_BroadbandModel') {
  		list.append("<li role='presentation'><a role='menuitem' tabindex='0'>French</a></li>");
  		list.append("<li role='presentation'><a role='menuitem' tabindex='1'>Portuguese</a></li>");
  		list.append("<li role='presentation'><a role='menuitem' tabindex='2'>Spanish</a></li>");
  	}
  	else if(currentModel == 'ar-AR_BroadbandModel') {
  		list.append("<li role='presentation'><a role='menuitem' tabindex='0'>English</a></li>");
  	}
  	else if(currentModel == 'es-ES_BroadbandModel') {
  		list.append("<li role='presentation'><a role='menuitem' tabindex='0'>English</a></li>");
  	}
  	else if(currentModel == 'pt-BR_BroadbandModel') {
  		list.append("<li role='presentation'><a role='menuitem' tabindex='0'>English</a></li>");
  	}

  }

  $("#dropdownMenuList").click(function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log('Change view', $(evt.target).text());
    var newModelDescription = $(evt.target).text();
    var newModel = $(evt.target).data('model');
    $('#dropdownMenuDefault').empty().text(newModelDescription);
  	$('#dropdownMenuTargetLanguageDefault').text("Choose Target Language");
  	$("#dropdownMenuTargetLanguage").empty();
    $('#dropdownMenu1').dropdown('toggle');
    localStorage.setItem('currentModel', newModel);

  	// HACK: just for now because these 3 source languages have only 1 target language, which is English
  	if( newModel == "ar-AR_BroadbandModel" ||
  		newModel == "pt-BR_BroadbandModel" ||
  		newModel == "es-ES_BroadbandModel") {
  		$('#dropdownMenuTargetLanguageDefault').text("English");
  	}

    ctx.currentModel = newModel;
    initPlaySample(ctx);
    $.publish('clearscreen');
  });

  $("#dropdownMenuInput").click(function(evt) {
	   onChooseTargetLanguageClick();
  });


}
