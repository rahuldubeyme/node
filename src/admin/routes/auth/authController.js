const { Users, Admin } = require('../../../../models'); 
const jwt = require("jsonwebtoken");  
const request = require('request');
const bcrypt = require("bcryptjs")

class authController{

    async dashboard(req, res) {  
        try{  
           console.log('==========dash', req.session.user._id); 
            
            return res.render('dashboard')
        }catch(err){

        } 
    };  

    async loginPage(req , res){
        try{
            //req.flash('error', 'Your action was successful.');
           return res.render('login')
        }catch(err){
            console.log('=> 11',err);  
        }   
    }

    async login(req, res) {
        try {
          const { email, password } = req.body;
          console.log('req.body ==>', req.body);
      
          const userData = await Admin.findOne({ email: email });
          if (!userData) {
            console.log('Email does not exist ==>', userData);
            return res.redirect('/auth/login');
          }
      
          const passwordMatch = await bcrypt.compare(password, userData.password);
          console.log('passwordMatch 1 ==>', passwordMatch);
          if (!passwordMatch) {
            console.log('Password does not match ==>', userData._id, 'passwordMatch 2 ==>', passwordMatch);
            return res.redirect('/auth/login');
          }
      
          const token = await jwt.sign(userData.toJSON(), 'secret-key', { expiresIn: 3600 });

          console.log('verify token after login==>>', token)

          req.session.user = userData.toJSON();
          req.session.token = token;
      
          return res.redirect('/');
        } catch (err) {
          console.log('login err ==>', err);
          return res.status(500).send('Internal Server Error');
        }
      }
      

    async profilePage(req , res){
        console.log('=> profile route');  
        try{
            
           return res.render('profile')
        }catch(err){

        }    
    }

    async profile(req, res) {  
        console.log('=> profile route');  
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
        console.log('=> logout route');  
        try{
            req.session.destroy();
            res.redirect('/');
        }catch(err){

        }   
    }; 


}

module.exports = new authController() ;