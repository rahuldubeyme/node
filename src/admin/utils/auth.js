const jwt = require('jsonwebtoken');
const { Users } = require('../../../models'); 


class varifyClass{
  async varifyToken(req, res, next){
        const { user } = req;

            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            console.log('v==>>',token)
              
            /* if (!token) {
              return res.status(403).send({
                message: "No token provided!"
              });
            } */
        
            console.log('token==>',token)
          
            jwt.verify(token, "ABCS", (err, decoded) => {
        
            console.log('token==>',decoded, "err=>, err")

              if (err || decoded) {
                return res.redirect('/auth/auth-login');
              }

              if (err != null || decoded) {
                let userData = Users.findOne({
                  _id : decoded.id
                })
                console.log('verified user==>>', userData)
                res.user = userData.Json();
                //next();
                return res.redirect('/');  
              }
              
            });
    }
}

module.exports = new varifyClass() ;