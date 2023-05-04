const express = require('express');
const router = express.Router(); 
const AuthController =  require('./authController'); 
//const varifyToken =  require('../../utils/auth'); 

// router.post('/login', (req, res) => {
//   res.send('Hello, World!');
// });


router.post("/sign-up", AuthController.register);
router.post("/log-in", AuthController.login);
router.post("/varify-otp", AuthController.verifyConfirm);
router.post("/resend-verify-otp", AuthController.resendConfirmOtp);

module.exports = router;   