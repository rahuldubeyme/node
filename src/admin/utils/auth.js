
class varifyClass{
 varifyToken = (req, res, next) => {
        const { user } = req;

        console.log('req.u2311====', req.session.user)
        //res.send('Response 1');
        if(req.session){
            console.log("111111111111")
            let LoginUser = req.session.user; 
            if(LoginUser != undefined){
                let user = req.session.user;    
                console.log("222222222222")
                //next(user); 
                res.redirect('/dashboard');   
            }else{
                console.log("333333333333")
                res.redirect('/login');       
            } 
        }else{
            res.redirect('/login');       
        }
    }

}

module.exports = new varifyClass() ;