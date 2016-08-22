var express = require('express');
var routes = require('./routes');
var filter = require("./login_filter.js");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');

var app = express();
var session = require('express-session')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"heart_music", resave:false, saveUninitialized: true}));

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/history', routes.history);
app.get('/404', routes.notfound);
app.post('/dologin', routes.dologin);
app.get('/admin',filter.authorize,routes.admin);
app.post('/api/detail', routes.getDetail);
app.post('/api/lyric', routes.getLyric);
app.post('/api/song', routes.getSong);
app.post('/api/add', routes.addMusic);
app.get('/history/:year/:month/:day',routes.index_history);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  /*var err = new Error('Not Found');
  err.status = 404;*/
  res.redirect('/404');
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
