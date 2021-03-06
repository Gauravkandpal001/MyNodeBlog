var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator =require('express-validator');
var cookieParser = require('cookie-parser');
var session=require("express-session");
var bodyParser = require('body-parser');
var mongo=require('mongodb');
var db=require('monk')(process.env.MONGODB_URI || 'localhost:27017/nodeblog');
var multer=require('multer');
var flash=require('connect-flash');

var routes = require('./routes/index');
var posts = require('./routes/posts');
var categories = require('./routes/categories');

var app = express();

//moment is a module that allows to format dates
//we use app.locals to make global variables
app.locals.moment =require('moment');

//used to cut the total length of text to only limited
//no. of words as introduction in main page
app.locals.truncateText =(text, length)=>{
    var truncatedText=text.substring(0,length);
    return truncatedText;
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Handles file upload and Multipart Data
app.use(multer({dest:'./public/images/uploads'}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Express session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

//Express expressValidator
app.use(expressValidator({
    errorFormatter:function(param, msg, value){
            var namespace=param.split('.')
            , root     =namespace.shift()
            , formParam =root;
        while(namespace.length){
            formParam+='['+namespace.shift()+']';
        }
        return{
            param: formParam,
            msg:msg,
            value:value
        };
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

//connect-Flash
app.use(flash());
app.use((req,res,next)=>{
    res.locals.messages=require('express-messages')(req,res);
    next();
});

//Make our DataBase accessable to our router
app.use((req,res,next)=>{
    req.db=db;
    next();
});

app.use('/', routes);
app.use('/posts', posts);
app.use('/categories', categories);

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

// app.listen(3000,()=>{
//     console.log('server running on port 3000...');
// });
module.exports = app;
