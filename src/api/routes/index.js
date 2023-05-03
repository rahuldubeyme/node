var express = require('express');
var router = express.Router(); 

var app = express();
const fs = require("fs");  

let route = fs.readdirSync(__dirname);

route.forEach((file) => {
    if(file === 'index.js') return;
    console.log("file==>>>", file)
    app.use(`/${file}`, require(`./${file}`))
});


module.exports = app;