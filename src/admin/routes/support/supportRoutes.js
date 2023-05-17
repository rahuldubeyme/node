const express = require('express');
const router = express.Router(); 
const userController =  require('../users/usersController'); 

router.get('/',  userController.userPage); 

router.get('/list',  userController.list);     



module.exports = router;   