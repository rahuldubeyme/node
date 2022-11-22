var express = require('express'); 
var app = express();
const moment = require('moment');
var http = require('http');
var connect = require('connect');
const fs = require("fs");  
const dotenv = require('dotenv');
dotenv.config();

//var app = connect();
const expressValidator = require('express-validator');
const cors = require('cors');
const bodyParser = require('body-parser'); 


app.use(cors()); 

const connectPool = require('./config/db.js'); 

/* global.successStatus = 200;
global.failStatus = 401; 
global.SessionExpireStatus = 500;  
global.CURRENCY = '$';  */


app.set('view engine', 'ejs');

var path = require('path');
app.set('views', path.join(__dirname, 'views'));  
app.use(express.static(__dirname +'/public'));  
var flash = require('express-flash-messages')
app.use(flash())


var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
app.use(cookieParser()); 
app.use(expressSession({secret: 'D%$*&^lk32', resave: false,saveUninitialized: true}));  

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});   
app.use(bodyParser.json());  
app.use(express.urlencoded({limit: '100mb',extended: true })); 
  


app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes'));



const port = process.env.PORT;
console.log(`Your port is ${port}`);

var server = app.listen(1000, function () { 
    
    console.log("Example app listening at http://localhost:%s", server.address().port);
});       
process.on('uncaughtException', function (err) { 
    console.log('Caught exception: ' + err);
});
module.exports = app;