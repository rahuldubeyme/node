const express = require('express');
const router = express.Router(); 
const AuthController =  require('./authController'); 
const {
  verifyToken
} =  require('../../helpers/utility'); 



router.post("/sign-up", AuthController.register);
router.post("/varify-otp", AuthController.verifyOtp);
router.post("/resend-otp", AuthController.resendOtp);
router.get('/log-out', verifyToken, AuthController.logout); 




module.exports = router;   