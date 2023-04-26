const { Users } = require('../../../../models'); 
const jwt = require("jsonwebtoken");  
const request = require('request');

class authController{

    async dashboard(req, res) {  
        try{  
            console.log('==========dash', req.session.user); 
            req.flash('success', 'Your action was successful.');
            const success = req.flash('success');
            const error = req.flash('error');
            let user = req.session.user;
            let alert = req.session.alert = 'You have been logged in.';
            
            return res.render('index',{error, success, user, alert})
        }catch(err){

        } 
    };  

    async loginPage(req , res){
        
        try{
            console.log('=> loginPage111111111'); 
            req.flash('error', 'Your action was successful.');
           return res.render('login')
        }catch(err){
            console.log('=> 11',err);  
        }   
    }

    async login(req, res) {          
        try{
        let { email , password } = req.body; 
            console.log('=> 11login', req.body); 
            //return 0;

            let userData = await Users.findOne({email: email})
            console.log('=> userData', userData); 
            await Users.findOne({email: email}).exec(function(error, user) {
            if (error) {
                console.log('=> error1', error); 
                callback({error: true})
            } else if (!user) {
                //callback({error: true})
                console.log('==users==>>', user);
                req.flash('success', 'enterd password is wrong!');
                const success = req.flash('success');
                const error = req.flash('error');
                return res.render('login',{error, success})
            } else {
                user.comparePassword(password, function(matchError, isMatch) {
                if (matchError) {
                    console.log('=matchError==>>',matchError);
                    res.warn('enterd password is wrong!')
                    return res.render('login')
                } else if (!isMatch) {
                    console.log('=matchError==>>',isMatch);
                } else {
                    jwt.sign(
                        userData.toJSON(),
                        "secret-key",
                        {
                          expiresIn: 3600
                        },
                        (err, token) => {
                          if (err) throw err;

                          console.log('jwt token after login==>', token)

                          req.session.user = userData;

                          req.session.token = token;

                          return res.redirect('/');
                        }
                      );
                    //callback({success: true})
                    // req.session.user = userData;
                    // console.log('userData=>>',userData);
                    // return res.redirect('/')
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