const jwt = require('jsonwebtoken');
const { Users } = require('../../../models'); 


class varifyClass{
  async varifyToken(req, res, next){
    try{
      const { user } = req;

      console.log('token==>',req.session.token)
        
          jwt.verify(req.session.token, "secret-key", (err, decoded) => {
      
          console.log('token1==>',decoded, "err=>, err", err)

            if(!decoded || !decoded == null) {
              return res.redirect('auth/login');
            }

            if(decoded != undefined) {
              let userData = Users.findOne({
                iat : decoded.iat
              })

              console.log('verified user==>>', decoded._id)
              res.user = decoded;
              res.session.user = decoded;
              next();
            }else{
              return res.redirect('auth/login');
            }              
          });

    }catch(erro){
      console.log('erro==>>', erro)
    }
    }
}

module.exports = new varifyClass() ;