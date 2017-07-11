var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var session = require('client-sessions');

var User = require('./models/user');
var index = require('./routes/index');
var users = require('./routes/users');
var lists = require('./routes/list');
var boards = require('./routes/board');
var checkBoardAccess = require('./routes/checkBoardAccess');
var requireLogin = require('./routes/requireLogin');
/* var singleBoard = require('./routes/prelloSingleBoard'); */

mongoose.connect('mongodb://localhost/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); //allow cors everywhere
app.use(session({ //session
  cookieName: 'session',
  secret: 'iK4VGTh5L2Cpn5FSyAVgNUUuK2Fir7',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));

//set sessions
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ username: req.session.user.username}, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

app.use('/', index);
app.use('/users', users); 	//processing user data, sending to main dashboard(of boards)
app.use('/board', requireLogin, boards);	//processes board stuff (select, insert , delete)
app.use('/list', requireLogin, lists);	//api stuff
// app.use('/singleBoard', singleBoard);

// catch 404 and forward to error handler 
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;