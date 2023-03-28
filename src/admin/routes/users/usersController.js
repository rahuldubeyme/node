const { Users } = require('../../../../models');   

class usersController{

    async list(req, res) {  

        res.render('users/list');   
        
    };  


}

module.exports = new usersController()