var passport = require('passport');
var PredixStrategy = require('passport-predix-oauth').Strategy;
var OAuth2RefreshTokenStrategy = require('passport-oauth2-middleware').Strategy;
var localConfig = require('./localConfig.json').development;
var predixStrategy;

function configurePassportStrategy(predixConfig) {
  'use strict';

  var refreshStrategy = new OAuth2RefreshTokenStrategy({
    refreshWindow: 10, // Time in seconds to perform a token refresh before it expires
    userProperty: 'ticket', // Active user property name to store OAuth tokens
    authenticationURL: '/', // URL to redirect unathorized users to
    callbackParameter: 'callback' //URL query parameter name to pass a return URL
  });

  passport.use('main', refreshStrategy);

	passport.serializeUser(function(user, done) {
		console.log("From USER-->"+JSON.stringify(user));
		done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	predixStrategy = new PredixStrategy({
		clientID: localConfig.clientId,
		clientSecret: localConfig.clientSecret,
		callbackURL: localConfig.callbackURL,
		authorizationURL: localConfig.uaaURL,
		tokenURL: localConfig.tokenURL
	},
	refreshStrategy.getOAuth2StrategyCallback() //Create a callback for OAuth2Strategy
	// function(accessToken, refreshToken, profile, done) {
	// 	console.log(accessToken);
	// 	token = accessToken;
	// 	done(null, profile);
	// }
);

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