const express = require('express');
const router = express.Router(); 
const categoryController =  require('./categoryController'); 

router.get('/',  categoryController.userPage); 

router.get('/list',  categoryController.list);     



module.exports = router;   