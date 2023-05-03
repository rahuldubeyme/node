var express = require('express');
var router = express.Router(); 
const AuthController =  require('./auth/authController'); 
const verifyToken =  require('../utils/auth'); 
const token = verifyToken.varifyToken;



const fs = require("fs");  

const path = require('path');
var app = express();

let route = fs.readdirSync(__dirname);

route.forEach((file) => {
    if(file === 'index.js') return;
    console.log("file==>>>", file)
    app.use(`/${file}`, require(`./${file}`))
});


console.log('check use route==>'  )

router.get('/auth/login', function(req, res) {
  res.send('Hello World 2!');
  return;
});

// router.get('/auth/auth-login', 
// // function(req, res) {
// //     res.send('Hello World!');
// //     //return;
// //   },
//   AuthController.loginPage
//   );


// router.post('/auth/auth-login', 
//     AuthController.login
//     );

router.get('/',token, AuthController.dashboard); 

router.get('/', 
function(req, res) {
    res.send('Hello World home!');
    return;
  },
  //AuthController.loginPage
  );


router.get('/profile',token,  AuthController.profilePage); 

router.post('/profle', token, AuthController.profile); 

router.get('/changepassword',token,  AuthController.changePasswordPage); 

router.post('/changepassword', token, AuthController.changePassword); 

router.get('/settings', token, AuthController.settingPage); 

router.post('/settings', token, AuthController.setting); 

router.get('/logout', token, AuthController.logout); 


module.exports = router;
