const express = require('express');
const router = express.Router(); 
const userController =  require('../users/usersController'); 
const {
    randomNumber,
  generateOTP,
  signInTempToken,
  verifyTempToken,
  signInToken,
  verifyToken
} =  require('../../helpers/utility'); 

// router.get('/profile', (req, res) => {
//   res.send('Hello, World!');
// });

router.get('/profile', verifyToken, userController.getProfile); 

router.post('/update-profile', verifyToken, userController.updateProfile); 




module.exports = router;   