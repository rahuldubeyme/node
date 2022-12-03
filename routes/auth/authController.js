const { Users } = require('../../models');   
const request = require('request');
console.log('model==>>', Users);

class authController{

    async dashboard(req, res) {  
        try{  
            console.log('11111'); 
            res.render('dashboard')
        }catch(err){

        } 
    };  

    async loginPage(req , res){
        console.log('=> login page');  
        try{
            
           return res.redirect('login')
        }catch(err){

        }   
    }

    async login(req, res) { 
        let { email , password} = req.body;  
        try{
            console.log('=> 11login', req.body); 

            let userData = await Users.findOne({email: email}).exec(function(error, user) {
            if (error) {
                callback({error: true})
            } else if (!user) {
                //callback({error: true})
                res.warn('enterd password is wrong!')
                return res.render('login')
            } else {
                user.comparePassword(password, function(matchError, isMatch) {
                if (matchError) {
                    console.log('=matchError==>>',matchError);
                    res.warn('enterd password is wrong!')
                    return res.render('login')
                    //callback({error: true}),
                } else if (!isMatch) {
                    console.log('=matchError==>>',isMatch);
                    //callback({error: true})
                } else {
                    
                    //callback({success: true})
                    return res.render('index')
                }
                })
            }
            })
            /* let session=req.session;
            session.user=userData;
            console.log("===>>session ==>>",userData) */
        }catch(err){

        }   
    }; 


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