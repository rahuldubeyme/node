// commonFunc.js

const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;
const {
  success,
	error,
	notFound,
	validation,
	unauthorized
} = require('../helpers/apiResponse');
const { Users, TempMobile } = require('../../../models');

function randomNumber(length) {
  var text = "";
  var possible = "123456789";
  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup == i ? "0" : possible.charAt(sup);
  }
  return Number(text);
}

function generateOTP(length) {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function signInTempToken(user) {
  const payload = {
    id: user._id
  };
  return jwt.sign(payload, process.env.JWT_TEMP_SECRET);
}

async function verifyTempToken(token) {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_TEMP_SECRET);
    return decoded;
  } catch (err) {
    throw err;
  }
}

function signInToken(user) {
  const payload = {
    id: user._id
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
}

async function verifyToken(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded == null) {
      return unauthorized({}, "Token is expired.");
    }
    if (decoded != undefined) {
     
      const user = await Users.findOne({
        _id : ObjectId(decoded._id),
        "isDeleted": false,
        //iat : decoded.iat // not saved
      });
	    res.user = user;
      res.session = user;
      if(!user) {
        return notFound({}, "User does not exist.", {});
      }
      if(user.isSuspended) {
        return unauthorized({}, "User is suspended.");
      }
      if(user.isDeleted) {
        return unauthorized({}, "User is deleted.");
      }
	  next();
    } else {
      return unauthorized({}, "Token is expired.");
    }
   
  } catch(err) {
    console.log('erro==>>', err);
  }
}

// Export the functions
module.exports = {
  randomNumber,
  generateOTP,
  signInTempToken,
  verifyTempToken,
  signInToken,
  verifyToken
};
