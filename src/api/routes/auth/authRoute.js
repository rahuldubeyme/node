const express = require('express');
const router = express.Router(); 
const AuthController =  require('./authController'); 
const varifyToken =  require('../../helpers/utility'); 



router.post("/sign-up", AuthController.register);
router.post("/log-in", AuthController.login);
router.post("/varify-otp", AuthController.verifyOtp);
router.post("/resend-otp", AuthController.resendOtp);
router.post("/forget-password", AuthController.forgetPassword);



module.exports = router;   