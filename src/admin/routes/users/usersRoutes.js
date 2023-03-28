const express = require('express');
const router = express.Router(); 
const userController =  require('../users/usersController'); 

router.get('/',  userController.list);     



module.exports = router;   