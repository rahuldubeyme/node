const { Users } = require('../../models');   

class authController{

    async dashboard(req, res) {  

        res.render('admin/dashboard');   
        
    };  


    async login(req , res){
        console.log('=> login route');  
        try{

        }catch(err){

        }    
    }

    async logout(req, res) {  
        console.log('=> login route');  
        try{

        }catch(err){

        }   
    }; 


}

module.exports = authController ;