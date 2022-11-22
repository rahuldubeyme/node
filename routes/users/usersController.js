const { Users } = require('../../models');   

class usersController{

    async list(req, res) {  

        res.render('admin/dashboard');   
        
    };  


}

module.exports = usersController ;