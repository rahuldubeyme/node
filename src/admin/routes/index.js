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
    if(file === 'index.js') return;
    console.log('file 23==>>',file)
    app.use(`/${file}`, require(`./${file}`))
});

router.get('/auth-login', token, AuthController.loginPage); 

router.post('/login', token,  AuthController.login); 



module.exports = router;
