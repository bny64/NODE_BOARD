const debug = require('debug')('app');
debug('**********app.js is started**********');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var fileUpload = require('express-fileupload');

const {sequelize} = require('./models');
//init sequelize
sequelize.sync(); 

var passport = require('passport');
const passportConfig = require('./passport/passport');

const interceptor = require('./common/inteceptor/interceptor');
const menuInterceptor = require('./common/inteceptor/menuInterceptor');

const filter = require('./common/filter/commonFilter');

var indexRouter = require('./routes/index');
var boardRouter = require('./routes/board'); 
var authRouter = require('./routes/auth');

var app = express();
//../models/index.js에 module.exports 와 exports의 관계 정리해 놓음.

// view engine setup - EJS template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:true
}));
app.use(flash());
app.use(logger('dev'));
app.use(express.json()); //body-parser 설정을 대신 함.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
passportConfig();

app.use(filter); //pre-FILTER
app.use(fileUpload({
  useTempFiles:false,
  limits: {fileSize:50 * 1024 * 1024},
}));
app.use('/', menuInterceptor, indexRouter);
app.use('/auth', authRouter);
app.use('/board', menuInterceptor, interceptor, boardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  if(req.method==='GET'){
    
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
