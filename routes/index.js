var express = require('express');
var router = express.Router(); 
var AuthController    =  require('./auth/authController');  
const fs = require("fs");  
const path = require('path');

console.log('==>>router running==>>');
//router.get('/', function(req, res) { 
    console.log("==path==>>",path.join('/', req.params));
//});

/* router.get('/', function(req, res) { 
     res.sendFile(path.join(__dirname + '/')); 
     console.log("check route==>>",data);
        //__dirname : It will resolve to your project folder. 
    }); */



fs.readFile(path,function(err, data)
    {
        console.log("check route==>>",data);
        res.end(data);
    })


    const url = req.url; 
    console.log('=====>>>url==>', url);

router.get('/home', AuthController.dashboard);  







module.exports = router ;