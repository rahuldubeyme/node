const mongoose = require('mongoose');
var express = require('express'); 
var app = express();
const flash = require('connect-flash');
var path = require('path'); 
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser'); 
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use(cookieParser()); 
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(flash()) 
app.use(express.static('public'));
app.use(expressSession({
    secret: "thisissessionkey",
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false 
}));
app.use(express.json());
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')) 
app.use(express.static(__dirname +'/public'));  
app.use(flash())
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  next();
});   
app.use(express.urlencoded({limit: '100mb',extended: true })); 




app.get('/', (req, res) => {
  res.json({"message": "Welcome to application"});
});

const port = process.env.PORT;
console.log(`Your port is ${port}`);
const hostname = 'localhost';

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
 

app.use((req,res,next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user || {};
    res.locals.token = req.session.token || {};
    res.locals.SITE_URL = dotenv.parsed.SITEURL;
    SITEURLS = `http://${hostname}:${port}/`
    

    next();
  });

  global.app = express(); 
  global.nodeAdminUrl = `http://${hostname}:${port}`;





app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


process.on('uncaughtException', function (err) { 
    console.log('Caught exception:...>> ' + err);
});


module.exports = app;