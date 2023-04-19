const jwt = require('jsonwebtoken');
const { Users } = require('../../../models'); 


class varifyClass{
  async varifyToken(req, res, next){
    try{
      const { user } = req;
      //console.log('token sessiion _id==>',req.session.user._id)

      console.log('token sessiion _id==>',req.session.token)
        
          jwt.verify(req.session.token, "secret-key", (err, decoded) => {
      
          console.log('token1==>',decoded, "err=>, err", err)

            if (decoded != undefined) {
              console.log('111111111111')
              let userData = Users.findOne({
                iat : decoded.iat
              })
              console.log('verified user==>>', decoded._id)
              res.user = decoded;
              next();
              //return res.render('index');
            }else{
              return res.redirect('auth/auth-login');
            }              
          });

    }catch(erro){
      console.log('erro==>>', erro)
    }
    }
}

module.exports = new varifyClass() ;