const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;
const { Admin } = require('../../../models'); 




async function verifyToken(req, res, next) {
  try {
    let token = req.session.token || 'abc';
    console.log('token =>', token);

    if (!token) {
      return res.redirect('/auth/login');
    }

    const decoded = jwt.verify(token, "secret-key");

    if (!decoded || decoded == null) {
      return res.redirect('/auth/login');
    }

    const user = await Admin.findOne({
      _id: ObjectId(decoded._id),
      isDeleted: false
    });

    if (!user) {
      return res.redirect('/auth/login');
    }

    if (user.isSuspended) {
      console.log("isSuspended =>", user.isSuspended);
      return res.redirect('/auth/login');
    }

    if (user.isDeleted) {
      console.log("isDeleted =>", user.isDeleted);
      return res.redirect('/auth/login');
    }

    res.user = user;
    req.session.user = user;
    next();
  } catch (err) {
    console.log('error verify token =>', err);
    return res.redirect('/auth/login');
  }
}



// Export the functions
module.exports = {
  verifyToken
};