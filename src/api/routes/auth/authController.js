const { Users, TempMobile } = require('../../../../models'); 
const jwt = require("jsonwebtoken");  
const request = require('request');
const bcrypt = require("bcryptjs")
var apiResponse = require("../../helpers/apiResponse");
const { ObjectId } = require('mongodb');

const utility = require('../../helpers/utility');
const now = new Date();
const fiveMinutesLater = new Date(now.getTime() + (50 * 60 * 1000));


class authController{

	
    async login(req, res) {          
		try {

			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);

			console.log("===============>>>>login", body);
			Users.findOne({$or : [{email : body.email}, { mobile : body.email}], isDeleted : false, isMobileVarify : true}).then(user => {
				if (user) {
					//Compare given password with db's hash.
					bcrypt.compare(body.password,user.password,function (err,same) {
						if(same){
							//Check account confirmation.
							if(user){
								// Check User's account active or not.
								if(user.isMobileVarify) {
									let userData = {
										_id: user._id,
										firstName: user.firstName,
										lastName: user.lastName,
										email: user.email,
									};
									//Prepare JWT token for authentication
									const jwtPayload = userData;
									const jwtData = {
										expiresIn: process.env.JWT_TIMEOUT_DURATION,
									};
									const secret = process.env.JWT_SECRET;
									//Generated JWT token with Payload and secret.
									userData.token = jwt.sign(jwtPayload, secret, jwtData);
									return apiResponse.success(res,"Login Success.", userData);
								}else {
									return apiResponse.unauthorized(res, "Account is not active. Please contact admin.");
								}
							}else{
								return apiResponse.unauthorized(res, "Account is not confirmed. Please confirm your account.");
							}
						}else{
							return apiResponse.unauthorized(res, "Email or Password wrong.");
						}
					});
				}else{
					return apiResponse.unauthorized(res, "Email or Password wrong.");
				}
			});
		} catch (err) {
			console.log("error==>", err)
			return apiResponse.Error(res, err);
		}
    }; 

    async register(req , res){
		try {
			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);	

			let x = await Users.findOne({ email : body.email, isEmailVarify : true, isDeleted : false })

			let y = await Users.findOne({ mobile : body.mobile, isMobileVarify : true, isDeleted : false })
			

			if(x){
				return apiResponse.warn(res,"Email already exist.", {});
			}else
			if(y){
				return apiResponse.warn(res,"Mobile number already exist.", {});
			}else {
				
				let user = Users()

				
	
					user.userName = body.userName;
					user.firstName = body.firstName;
					user.lastName = body.lastName;
					user.email = body.email;
					user.countryCode = body.countryCode;
					user.mobile = body.mobile;
					user.password = body.password;
		
					await user.save();

					
					//here is js not working

					let otp = utility.generateOTP(4);

					console.log('body1=2=>>', body, "user=>", utility.generateOTP(4));
					
					
					let tempMobile = TempMobile();
					tempMobile.mobileNumber = body.mobile,
					tempMobile.verificationCode = otp,
					tempMobile.validTillAt = fiveMinutesLater.valueOf()
					await tempMobile.save(); 

					/* sign token */

					console.log("payload==>>",user )
					const token = utility.signInTempToken(user)
					console.log("payload==>>",token )

					//return res.send()
					let userJSON = {
						user : user._id,
						mobile : user.mobile,
						token : token,
						otp : otp
					}
	
					return apiResponse.success(res,"Otp sent on your registred mobile", userJSON);
			}

		} catch (err) {
			//throw error in json response with status 500.
			return apiResponse.Error(res, err);
		}    
    }

    async verifyOtp(req, res) {  
        try {

			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);

			let x = await TempMobile.findOne({ mobileNumber : body.mobile , verificationCode : body.otp })

			if(x.validTillAt < now.valueOf() || !x){
					//otp expire
					return apiResponse.success(res,"Otp is Expired", {});
			}else{
				const decoded = utility.varifyTempToken(body.token);
					// If the token is valid, the decoded object will contain the payload data
					
				if(!decoded){
					return apiResponse.success(res,"Token is Expired", {});
				}

				console.log('perm-token decoded 1==>>', decoded);

				let user = await Users.findOneAndUpdate({
					_id : new ObjectId(decoded.id)
				 },
				 	{
						$set : {
							isMobileVarify : true
						}
					}
				 )

				 console.log('perm-token decoded 2==>>', decoded);

				 /* set perm token */
				 const token = utility.signInToken(user)

				 console.log('perm-token==>>', token);

				 let userJSON = {
					token : token
				}

				return apiResponse.success(res,"Registration successfully completed", userJSON);
				
			}
			
		} catch (err) {
			return res.send(err);
		} 	
    }; 

    async resendOtp(req, res) {  
        try {
			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);
			console.log('params==>>', body)

			let user = await Users.findOne({ mobile : body.mobile, isDeleted : false })

			if(!user){
				return apiResponse.success(res,"Mobile number is not exist", {});
			}else{
				let otp = utility.generateOTP(4);
				let tempMobile = TempMobile();
					tempMobile.mobileNumber = body.mobile,
					tempMobile.verificationCode = otp,
					tempMobile.validTillAt = fiveMinutesLater.valueOf()
					await tempMobile.save();

					const token = utility.signInTempToken(user)

					let userJSON = {
						mobile : user.mobile,
						token : token,
						otp : otp
					}
	
					return apiResponse.success(res,"Otp sent on your registred mobile", userJSON);

			}
		} catch (err) {
			return apiResponse.Error(res, err);
		}  
    }; 

	async forgetPassword(req, res) {  
        try {
			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);

			let user = await Users.findOne({ email : body.email, mobile : body.email, isDeleted : false })
			let user1 = await Users.find({ })
			console.log('params==>>', user1)
				//return 0;

			if(!user){
				return apiResponse.success(res,"User not exist", {});
			}else{
				

				let otp = utility.generateOTP(4);
				let tempMobile = TempMobile();
					tempMobile.mobileNumber = user.mobile,
					tempMobile.verificationCode = otp,
					tempMobile.validTillAt = fiveMinutesLater.valueOf()
					await tempMobile.save();

					const token = utility.signInTempToken(user)

					let userJSON = {
						mobile : user.mobile,
						token : token,
						otp : otp
					}
	
					return apiResponse.success(res,"Otp sent on your registred mobile", userJSON);

			}
		} catch (err) {
			return apiResponse.Error(res, err);
		}  
    }; 


}

module.exports = new authController() ;