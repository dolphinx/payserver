'use strict';

const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
var settings = require('./settings');

const clientRoot = path.join(__dirname, '..', 'payclient');
const build = require('./build');
build.buildTemplate(path.join(clientRoot, 'js', 'template.js'), path.join(clientRoot, 'template'));
const app = express();

// view engine setup
app.set('views', path.join(clientRoot, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(clientRoot, 'favicon.ico')));
if (app.get('env') === 'development') {
	const logger = require('morgan');
	app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable('x-powered-by');
if (settings.server.portForProxy)
	app.set('trust proxy', 'loopback');
else {
	const compression = require('compression');
	app.use(compression());
	app.use(function (req, res, next) {
		res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:");
		res.setHeader("X-Content-Type-Options", "nosniff");
		res.setHeader("X-Frame-Options", "SAMEORIGIN");
		res.setHeader("X-XSS-Protection", "1; mode=block");
		next();
	});
	app.use(express.static(clientRoot));
}

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
