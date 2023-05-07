const jwt = require('jsonwebtoken');
var apiResponse = require("../helpers/apiResponse");
const { Users, TempMobile } = require('../../../models'); 
const { ObjectId } = require('mongodb');


module.exports = {
	randomNumber: function (length) {
		var text = "";
		var possible = "123456789";
		for (var i = 0; i < length; i++) {
			var sup = Math.floor(Math.random() * possible.length);
			text += i > 0 && sup == i ? "0" : possible.charAt(sup);
		}
		return Number(text);
	},

	generateOTP: function (length) {
		const digits = '0123456789';
		let OTP = '';
		for (let i = 0; i < 6; i++) {
			OTP += digits[Math.floor(Math.random() * 10)];
		}
		return OTP;
	},

	signInTempToken: function (user) {
		const payload = {
			id: user._id
		};

		return jwt.sign(payload, process.env.JWT_TEMP_SECRET);
	},

	varifyTempToken: function (token) {

		return jwt.verify(token, process.env.JWT_TEMP_SECRET);
	},
	

	signInToken: function (user) {
		const payload = {
			id: user._id
		};

		return jwt.sign(payload, process.env.JWT_SECRET);
	},

	varifyToken(req, res, next){
		try{

			const authorizationHeader = req.headers.authorization;
			const token = authorizationHeader.split(' ')[1]; 

			
			  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
	
				if(!decoded || !decoded == null) {
					return apiResponse.unauthorized({}, "Token is expired.");
				}
	
				if(decoded != undefined) {
					console.log("==>>", decoded)
				  Users.findOne({
					_id : ObjectId(decoded._id),
					"isDeleted": false,
					//iat : decoded.iat // not saved
				  }).then(user => {
					console.log("user.isSuspended=>>",user)
					if(!user){
						return apiResponse.notFound({}, "User is exist.");
					}
					if(user.isSuspended){
						return apiResponse.unauthorized({}, "User is suspended.");
					}
					if(user.isDeleted){
						return apiResponse.unauthorized({}, "User is deleted.");
					}
					console.log("user in verifyToken=>", user._id)
					res.user = user;
					res.session = user;
					next();
				  })				  
				}else{
					return apiResponse.unauthorized({}, "Token is expired.");
				}              
			  });
	
		}catch(erro){
		  console.log('erro==>>', erro)
		}
		}
};
