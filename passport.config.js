var passport = require('passport');
var PredixStrategy = require('passport-predix-oauth').Strategy;
var OAuth2RefreshTokenStrategy = require('passport-oauth2-middleware').Strategy;
var predixStrategy;

function configurePassportStrategy() {
  'use strict';
	var refreshStrategy = new OAuth2RefreshTokenStrategy({
		refreshWindow: 10, // Time in seconds to perform a token refresh before it expires
		userProperty: 'ticket', // Active user property name to store OAuth tokens
		authenticationURL: '/login', // URL to redirect unathorized users to
		callbackParameter: 'callback' //URL query parameter name to pass a return URL
	});

    //Main authorization strategy that authenticates
    //user with stored OAuth access token and performs a token refresh if needed
	passport.use('main', refreshStrategy);  

	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.  However, since this example does not
	//   have a database of user records, the complete CloudFoundry profile is
	//   serialized and deserialized.
	passport.serializeUser(function(user, done) {
		// console.log("From USER-->"+JSON.stringify(user));
		done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	function getSecretFromEncodedString(encoded) {
		if (!encoded) {
			return '';
		}
		var decoded = new Buffer(encoded, 'base64').toString();
		// console.log('DECODED:  ' + decoded);
		var values = decoded.split(':');
		if (values.length !== 2) {
			throw "base64ClientCredential is not correct. \n It should be the base64 encoded value of: 'client:secret' \n Set in localConfig.json for local dev, or environment variable in the cloud.";
		}
		return values[1];
	}

	var predixStrategy = new PredixStrategy({
		clientID: 'foo',
		clientSecret: 'foo',
		callbackURL: "https://localhost:3000",
		authorizationURL: "https://2f2bd91e-3b1b-4e16-9838-7f697b13c47e.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/authorize",
		tokenURL: "https://2f2bd91e-3b1b-4e16-9838-7f697b13c47e.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token"
	},refreshStrategy.getOAuth2StrategyCallback(), //Create a callback for OAuth2Strategy
	function(accessToken, refreshToken, profile, done) {
		token = accessToken;
		done(null, profile);
	});

	passport.use(predixStrategy);
	//Register the OAuth strategy to perform OAuth2 refresh token workflow
	refreshStrategy.useOAuth2Strategy(predixStrategy);

  return passport;
}

function reset() {
  'use strict';
  predixStrategy.reset();
}

module.exports = {
  configurePassportStrategy: configurePassportStrategy,
  reset: reset
};
