const express = require('express');
const router = express.Router(); 
const pagesController =  require('./pagesController'); 

router.get('/',  pagesController.userPage); 

router.get('/list',  pagesController.list);     



module.exports = router;   