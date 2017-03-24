var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var passportConfig = require('./passport-config');
var session = require('express-session');

var appRoutes = require('./routes/app');

var app = express();

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

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE, OPTIONS');
    next();
});

passport = passportConfig.configurePassportStrategy();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
// Also use passport.session() middleware, to support persistent login sessions (recommended).
app.use(passport.session());

app.use('/', appRoutes);

app.get('/signin', passport.authenticate('predix', {'scope': ''}), function(req, res) {
    // The request will be redirected to Predix for authentication, so this
    // function will not be called.
});

app.get('/signin/callback', passport.authenticate('predix'), function(req, res, next) {
        res.cookie('token', req.user.ticket.access_token);
        res.redirect('/materials');
        next();
});

app.get('/logout', function(req, res) {
    const localConfig = require('./localConfig.json').development;
    req.session.destroy();
    req.logout();
    passportConfig.reset();
    res.redirect(localConfig.uaaURL + '/logout?redirect=' + localConfig.appURL);
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
