const { Users } = require('../../../../models');   

class usersController{

    async userPage(req, res) {  

        res.render('users/list');   
        
    };  


    async list(req, res) {  

        res.render('users/list');   
        
    };  


}

module.exports = new usersController()