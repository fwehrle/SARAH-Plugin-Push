exports.action = function(data, callback, config, SARAH) {
  
  var exec = require('child_process').exec;
  var util = require('util');
  var Prowl = require('./lib/prowl.js');
	config=config.modules.push;
    var api_key_default = config.api_key_1;	
	if ((!config.api_key_1)||(config.api_key_1 == '')) {
        return callback({ 'tts': 'Clé API non saisie' });
    }
	
	//Selection du device selon utilisateur
	var user = data.who;
	switch(user)
	{
		case 'Franck':
			api_key = api_key_default;
			break;
		case 'Evelyne':
			if ((!config.api_key_2)||(config.api_key_2 == '')) {
				return callback({ 'tts': 'Clé API 2 non saisie pour l\'utilisateur '+user });
			}
			api_key = config.api_key_2;
			break;
		case 'User3':
			if ((!config.api_key_3)||(config.api_key_3 == '')) {
				return callback({ 'tts': 'Clé API 3 non saisie pour l\'utilisateur '+user });
			}
			api_key = config.api_key_3;
			break;
		case 'User4':
			if ((!config.api_key_4)||(config.api_key_4 == '')) {
				return callback({ 'tts': 'Clé API 4 non saisie pour l\'utilisateur '+user });
			}
			api_key = config.api_key_4;
			break;
		default:
			return callback({ 'tts': 'Utilisateur '+user+' non reconnu' });
	}
	var msg = (data.msg==''?"Hello, c'est SARAH!":data.msg);
	var title = (!data.title?"Notification":data.title);
	var app = "SA.R.A.H.";
	
process.addListener('uncaughtException', function(exception) {
	//console.log(exception.message)
	//console.log(exception.stack)

	/*
	var exceptionNotification = new Prowl.connection(prowlApiKey);

	exceptionNotification.send({
		'application': 'node-prowl Example',
		'event': 'uncaughtException - '+exception.message,
		'description': exception.stack
	});
	*/
});

var notification = new Prowl.connection(api_key);
notification.send({
	'application': app // 256 max -  The name of your application or the application generating the event.
	,'event': title // 1024 max - The name of the event or subject of the notification.
	,'description': msg // 10000 max -  	A description of the event, generally terse.
	,'priority': 0 /*
		Default value of 0 if not provided. An integer value ranging [-2, 2] representing:
			2. Very Low
			1. Moderate
			0. Normal
			1. High
			2. Emergency
		Emergency priority messages may bypass quiet hours according to the user's iPhone app settings.
	*/
}, function(err, info) {
	if (err) {
		callback({ 'tts': 'Erreur d\'envoi de notification' });
		throw err;
	}else{
		callback({ 'tts': 'Message envoyé à '+user });
	}
	console.log(info);
});

	
	

  
  
}