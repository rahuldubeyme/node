const express = require('express');
const router = express.Router(); 
const userController =  require('../users/usersController'); 
const token =  require('../../helpers/utility'); 



// router.get('/profile', (req, res) => {
//   res.send('Hello, World!');
// });

router.get('/profile', token.varifyToken, userController.userPage); 

router.post('/update-profile', token.varifyToken, userController.userPage);     



module.exports = router;   