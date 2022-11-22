const { Users } = require('../../models');   

class authController{

    async dashboard(req, res) {  

        res.render('admin/dashboard');   
        
    };  

    async loginPage(req , res){
        try{
            console.log('1112222=> login route'); 

            console.log('===>>render', res.render('login'))
        }catch(err){

        }    
    }

    async login(req, res) {  
        console.log('=> login route');  
        try{

        }catch(err){

        }   
    }; 


    async profilePage(req , res){
        console.log('=> login route');  
        try{

        }catch(err){

        }    
    }

    async profile(req, res) {  
        console.log('=> login route');  
        try{

        }catch(err){

        }   
    }; 

    async changePasswordPage(req , res){
        console.log('=> login route');  
        try{

        }catch(err){

        }    
    }

    async changePassword(req, res) {  
        console.log('=> login route');  
        try{

        }catch(err){

        }   
    }; 



    async settingPage(req , res){
        console.log('=> login route');  
        try{

        }catch(err){

        }    
    }

    async setting(req, res) {  
        console.log('=> login route');  
        try{

        }catch(err){

        }   
    }; 

    async logout(req, res) {  
        console.log('=> login route');  
        try{

        }catch(err){

        }   
    }; 


}

module.exports = new authController() ;