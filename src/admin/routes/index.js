var express = require('express');
var router = express.Router(); 
const AuthController =  require('./auth/authController'); 
const { verifyToken } =  require('../utils/auth')


var app = express();
const fs = require("fs");  

let route = fs.readdirSync(__dirname);

route.forEach((file) => {
    if(file === 'index.js') return;
    console.log("file==>>>", file)
    router.use(`/${file}`, require(`./${file}`))
});


console.log('check use route 1==>'  )

//router.get('/', 
// function(req, res) {
//     res.send('Hello World home!');
//     return;
//   },
//   //AuthController.loginPage
//   );


// router.get('/auth/login', function(req, res) {
//   res.send('Hello World 2!');
//   return;
// });

// router.get('/auth/login', 
// function(req, res) {
//     res.send('Hello World!');
//     //return;
//   },
//   //AuthController.loginPage
//   );


// router.post('/auth/auth-login', 
//     AuthController.login
//     );

router.get('/',verifyToken, AuthController.dashboard); 

router.get('/profile',verifyToken,  AuthController.profilePage); 

router.post('/profle', verifyToken, AuthController.profile); 

router.get('/changepassword',verifyToken,  AuthController.changePasswordPage); 

router.post('/changepassword', verifyToken, AuthController.changePassword); 

router.get('/setting', verifyToken, AuthController.settingPage); 

router.post('/setting', verifyToken, AuthController.setting); 

router.get('/logout', verifyToken, AuthController.logout); 


module.exports = router;
