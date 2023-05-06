const { Users } = require('../../../../models'); 

const varifyToken =  require('../../helpers/utility'); 

class usersController{

    async userPage(req, res) {  



        console.log("reqq==>>", req.session, "token==>")

      //  res.render('users/list');   
        
    };  


    async list(req, res) {  

        res.render('users/list');   
        
    };  


}

module.exports = new usersController()