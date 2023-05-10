const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;
const { Users } = require('../../../models'); 




async function verifyToken(req, res, next) {
  try {
   
    let token = req.session.token != undefined ? req.session.token : 'abc';
    console.log('token==>', token)
    const decoded = await jwt.verify(token, "secret-key", (err, decoded) => {
    
    	if (!decoded || decoded == null) {
        res.redirect('/auth/login');
      }
    if (decoded != undefined) {
      const user = Users.findOne({
       // _id : ObjectId(decoded._id),
        iat : decoded.iat,
        //"isDeleted": false
      });
      res.user = user;
      res.session.user = user;
	    next();
      console.log("=decd00=>>", user, decoded);
      if(!user) {
        res.redirect('/auth/login');
      }
      if(user.isSuspended) {
        res.redirect('/auth/login');
      }
      if(user.isDeleted) {
        res.redirect('/auth/login');
      }
    }    
    else {
      res.redirect('/auth/login');
  }
    });
    res.redirect('/auth/login');
  } catch(err) {
    console.log('erro==>>', err);
  }
}


// Export the functions
module.exports = {
  verifyToken
};