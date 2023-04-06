const jwt = require('jsonwebtoken');
const { Users } = require('../../../models'); 


class varifyClass{
  async varifyToken(req, res, next){
        const { user } = req;


        console.log('token sessiion==>',req.session)
          
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
                next();
              }
              
            });
    }
}

module.exports = new varifyClass() ;