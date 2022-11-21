var express = require('express');
var router = express.Router(); 
var AuthController    =  require('./auth/authController');  
const fs = require("fs");  
const path = require('path');
var app = express();
let route = fs.readdirSync(__dirname);
route.forEach((file) => {
    if(file === 'index.js') return;
    //app.use('/', file)
    app.use(path.join('/' + file)); 
});






router.get('/home', AuthController.dashboard);  







module.exports = router ;