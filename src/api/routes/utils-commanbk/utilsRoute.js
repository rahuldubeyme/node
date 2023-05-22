const express = require('express');
const router = express.Router(); 
const utilsController =  require('../utils/utilsController'); 
const {
    randomNumber,
  generateOTP,
  signInTempToken,
  verifyTempToken,
  signInToken,
  verifyToken
} =  require('../../helpers/utility'); 


router.post('/upload-file', verifyToken, utilsController.uploadFile); 

router.post('/delete-file', verifyToken, utilsController.deleteFile); 




module.exports = router;   