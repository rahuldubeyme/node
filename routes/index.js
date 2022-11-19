var express = require('express');
var router = express.Router(); 
var AuthController    =  require('./auth');  
const fs = require("fs");  

console.log('==>>router running==>>');
fs.readFile(path,function(err, data)
    {
        console.log(data);
        res.end(data);
    })


    const url = req.url; 
    console.log('=====>>>url==>', url);

router.get('/home', AuthController.dashboard);  




/* router.get('/', function(req, res) { 
     res.sendFile(path.join(__dirname + '/index.html')); 
        //__dirname : It will resolve to your project folder. 
    }); */



module.exports = router ;