const express = require('express');
const router = express.Router(); 
const AuthController =  require('./authController'); 
//const varifyToken =  require('../../utils/auth'); 
console.log("route============>>>>>>>")

router.post('login', (req, res) => {
  res.send('Hello, World!');
});


// router.post("/register", AuthController.register);
// router.post("/login", AuthController.login);
// router.post("/verify-otp", AuthController.verifyConfirm);
// router.post("/resend-verify-otp", AuthController.resendConfirmOtp);

module.exports = router;   