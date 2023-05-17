const { Users } = require('../../../../models');   

class categoryController{

    async userPage(req, res) {  

        res.render('category/list');   
        
    };  


    async list(req, res) {  

        res.render('category/list');   
        
    };  


}

module.exports = new categoryController()