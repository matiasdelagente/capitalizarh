var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var morgan = require('morgan');
var session = require('express-session');
mongoose.connect('mongodb://localhost/capitalizar');

require('./models/Cursos');
require('./models/Instituciones');
require('./models/Servicios');
require('./models/Banners');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));


app.use(logger('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(express.static('public'));

app.use(session({ secret: 'moscardon', saveUninitialized: true, resave: true})); // session secret

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;
