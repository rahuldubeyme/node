const { Users } = require('../../models');   

class authController{

    async dashboard(req, res) {  
        try{  
            console.log('11111'); 

            console.log('2222222222',render('index'))
            res.render('index')
        }catch(err){

        } 
    };  

    async loginPage(req , res){
        console.log('=> login route');  
        try{
            
           return res.render('login')
        }catch(err){

        }   
    }

    async login(req, res) {  
        console.log('=> login route');  
        try{
            
           return res.render('login')
        }catch(err){

        }   
    }; 


    async profilePage(req , res){
        console.log('=> login route');  
        try{
            
           return res.render('profile')
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
            return res.render('changepassword')
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
            
           return res.render('settings')
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