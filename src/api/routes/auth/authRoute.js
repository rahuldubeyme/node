const express = require('express');
const router = express.Router(); 
const AuthController =  require('./authController'); 
const {
  verifyToken
} =  require('../../helpers/utility'); 



router.post("/sign-up", AuthController.register);
router.post("/log-in", AuthController.login);
router.post("/varify-otp", AuthController.verifyOtp);
router.post("/resend-otp", AuthController.resendOtp);
router.post("/forget-password", AuthController.forgetPassword);
router.post("/change-password",verifyToken, AuthController.changePassword);
router.get('/log-out', verifyToken, AuthController.logout); 




module.exports = router;   