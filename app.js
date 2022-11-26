var express = require('express'); 
var app = express();
const moment = require('moment');
var http = require('http');
var connect = require('connect');
const fs = require("fs"); 
var path = require('path'); 
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const bodyParser = require('body-parser'); 
app.use(cors()); 
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
app.use(cookieParser()); 
app.use(expressSession({secret: 'D%$*&^lk32', resave: false,saveUninitialized: true}));  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static(__dirname +'/public'));  
var flash = require('express-flash-messages')
app.use(flash()) 
app.use(express.static(path.join(__dirname, 'public')));

const connectPool = require('./config/db.js'); 



app.use('/', require('./routes'));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) 
app.get('/', function (req, res) {
    res.render('login')
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