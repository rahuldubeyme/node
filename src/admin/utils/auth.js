
class varifyClass{
 varifyToken = (req, res, next) => {
        const { user } = req;


           

            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            console.log('v==>>',token)
            
            if (!token) {
              return res.status(403).send({
                message: "No token provided!"
              });
            }
        
            console.log('token==>',token)
          
            require("jsonwebtoken").verify(token, "ABCS", (err, decoded) => {
        
            console.log('token==>',decoded, "err=>, err")
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!"
                });
              }
              req.userId = decoded.id;
              next();
            });
        //res.send('Response 1');
       /*  if(req.session){
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
        } */
    }
}

module.exports = new varifyClass() ;