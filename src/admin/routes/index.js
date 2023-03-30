var express = require('express');
var router = express.Router(); 
const AuthController =  require('./auth/authController'); 
const varifyToken =  require('../utils/auth'); 
let token = varifyToken.varifyToken;


const fs = require("fs");  

const path = require('path');
var app = express();

let route = fs.readdirSync(__dirname);

route.forEach((file) => {
    console.log('file 23==>>',file)
    if(file === 'index.js') return;
    app.use(`/${file}`, require(`./${file}`))
});

router.get('/', token, AuthController.dashboard); 


router.get('/login',  AuthController.loginPage); 

router.post('/login',  AuthController.login); 

router.get('/dashboard', token, AuthController.dashboard); 

module.exports = router;
