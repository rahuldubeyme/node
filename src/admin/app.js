var express = require('express'); 
var app = express();
const moment = require('moment');
var http = require('http');
var connect = require('connect');
const fs = require("fs"); 
const request = require('request');
const flash = require('connect-flash');

var path = require('path'); 
const dotenv = require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser'); 
app.use(cors()); 
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
//app.use(express.static(__dirname +'/public')); 
app.use(flash()) 
 app.use(express.static(path.join(__dirname, 'public')));
 app.use('./public', express.static('public'));

const connectPool = require('../../config/db'); 
const oneDay = 1000 * 60 * 60 * 24;
app.use(expressSession({
    secret: "thisissessionkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));

// console.log("public===>>", express.static('public'))

app.use('/', require('./routes'));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) 
app.get('/', function (req, res) {
  if(!req.session.user){
    console.log('not getting session user ===',req.session.user)
    res.render('login')
  }else{
    console.log('getting session user ===',req.session.user)
    let user = req.session.user;
    res.render('index',{user})
  }
   
});

 


app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});




app.use((req,res,next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user || {};
    res.locals.token = req.session.token || {};
    res.locals.SITE_URL = dotenv.parsed.SITEURL;

    next();
  });





app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});
const port = process.env.PORT;
console.log(`Your port is ${port}`);

var server = app.listen(port, function () { 
    
    console.log("Example app listening at http://localhost:%s", server.address().port);
});   

process.on('uncaughtException', function (err) { 
    console.log('Caught exception: ' + err);
});


module.exports = app;