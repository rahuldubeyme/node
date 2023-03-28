var express = require('express');
var router = express.Router(); 

const fs = require("fs");  

const path = require('path');
var app = express();

let route = fs.readdirSync(__dirname);

route.forEach((file) => {
    if(file === 'index.js') return;
    console.log('file 23==>>',file)
    app.use(`/${file}`, require(`./${file}`))
});



module.exports = router;
