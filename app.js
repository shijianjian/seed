var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');

var passport;
var passportConfig = require('./passport.config');
var proxy = require('./routes/proxy');
var config = require('./predix-config');

var app = express();

// should fix oauth error: socket hang up
// but not
var http = require('http');
var https = require('https');
http.Agent.maxSockets = 1024;
http.globalAgent.maxSockets = 1024;
https.Agent.maxSockets = 1024;
https.globalAgent.maxSockets = 1024;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var node_env = process.env.node_env || 'development';
if (node_env === 'development') {
  var devConfig = require('./localConfig.json')[node_env];
	proxy.setServiceConfig(config.buildVcapObjectFromLocalConfig(devConfig));
	proxy.setUaaConfig(devConfig);
}

app.set('trust proxy', 1);
app.use(cookieParser('predixsample'));
// Initializing default session store
// *** Use this in-memory session store for development only. Use redis for prod. **
app.use(session({
	secret: 'predixsample',
	name: 'cookie_name',
	proxy: true,
	resave: true,
	saveUninitialized: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

console.log(config.isUaaConfigured());

if (config.isUaaConfigured()) {

    passport = passportConfig.configurePassportStrategy();

    app.use(passport.initialize());
    // Also use passport.session() middleware, to support persistent login sessions (recommended).
  	app.use(passport.session());

    app.use('/', appRoutes);

    app.get('/login', passport.authenticate('predix', {'scope': ''}), function(req, res) {
        // The request will be redirected to Predix for authentication, so this
        // function will not be called.
    });

    app.get('/callback',  function(req, res, next) {
        passport.authenticate('predix',{ 'ciphers' : 'DES-CBC3-SHA'}, function (err, user, info) {
            if(err){
              console.log(err);
              return next(err);
            }
            res.redirect('/user');
          })(req, res, next);
    });
}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
