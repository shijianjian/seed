/*
This module reads config settings from localConfig.json when running locally,
  or from the VCAPS environment variables when running in Cloud Foundry.
*/

var settings = {};

// checking NODE_ENV to load cloud properties from VCAPS
// or development properties from config.json.
// These properties are not needed for fetching mock data.
// Only needed if you want to connect to real Predix services.
var node_env = process.env.node_env || 'development';
if(node_env === 'development') {
  // use localConfig file
	var devConfig = require('./localConfig.json').development;
	// console.log(devConfig);
	settings.clientSecret = devConfig.clientSecret;
	settings.clientId = devConfig.clientId;
	settings.uaaURL = devConfig.uaaURL;
	settings.tokenURL = devConfig.uaaURL;
	settings.appURL = devConfig.appURL;
	settings.callbackURL = devConfig.appURL + '/signin/callback';

} else {
	// read VCAP_SERVICES
	var vcapsServices = JSON.parse(process.env.VCAP_SERVICES);
	var uaaService = vcapsServices[process.env.uaa_service_label];

	if(uaaService) {
    	settings.uaaURL = uaaService[0].credentials.uri;
		settings.tokenURL = uaaService[0].credentials.uri;
	}

	// read VCAP_APPLICATION
	var vcapsApplication = JSON.parse(process.env.VCAP_APPLICATION);
		settings.appURL = 'https://' + vcapsApplication.uris[0];
		settings.callbackURL = settings.appURL + '/signin/callback';
		settings.clientSecret = process.env.clientSecret;
		settings.clientId = process.env.clientId;
}
console.log('config settings: ' + JSON.stringify(settings));

// This vcap object is used by the proxy module.
settings.buildVcapObjectFromLocalConfig = function(config) {
	'use strict';
	// console.log('local config: ' + JSON.stringify(config));
	var vcapObj = {};
	if (config.uaaURL) {
		vcapObj['predix-uaa'] = [{
			credentials: {
				uri: config.uaaURL
			}
		}];
	}
	return vcapObj;
};

module.exports = settings;