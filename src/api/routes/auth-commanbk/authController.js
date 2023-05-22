const { Users, TempMobile } = require('../../../../models'); 
const jwt = require("jsonwebtoken");  
const request = require('request');
const bcrypt = require("bcryptjs")
var {
	success,
	error,
	notFound,
	validation,
	unauthorized
} = require("../../helpers/apiResponse");
const { ObjectId } = require('mongodb');

const { randomNumber,
	generateOTP,
	signInTempToken,
	verifyTempToken,
	signInToken,
	verifyToken
 } = require('../../helpers/utility');
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
									return success(res,"Login Success.", userData);
								}else {
									return unauthorized(res, "Account is not active. Please contact admin.");
								}
							}else{
								return unauthorized(res, "Account is not confirmed. Please confirm your account.");
							}
						}else{
							return unauthorized(res, "Email or Password wrong.");
						}
					});
				}else{
					return unauthorized(res, "Email or Password wrong.");
				}
			});
		} catch (err) {
			console.log("error==>", err)
			return error(res, err);
		}
    }; 

    async register(req , res){
		try {
			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);	

			let x = await Users.findOne({ email : body.email, isEmailVarify : true, isDeleted : false })

			let y = await Users.findOne({ mobile : body.mobile, isMobileVarify : true, isDeleted : false })
			

			if(x){
				return warn(res,"Email already exist.", {});
			}else
			if(y){
				return warn(res,"Mobile number already exist.", {});
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
					
					let tempMobile = TempMobile();
					tempMobile.mobileNumber = body.mobile,
					tempMobile.verificationCode = otp,
					tempMobile.validTillAt = fiveMinutesLater.valueOf()
					await tempMobile.save(); 

					/* sign token */

					console.log("payload==>>",user )
					const token = await signInTempToken(user)
					console.log("payload==>>",token )

					//return res.send()
					let userJSON = {
						user : user._id,
						mobile : user.mobile,
						token : token,
						otp : otp
					}
	
					return success(res,"Otp sent on your registred mobile", userJSON);
			}

		} catch (err) {
			//throw error in json response with status 500.
			return error(res, err);
		}    
    }

    async verifyOtp(req, res) {  
        try {

			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);
			
			let x = await TempMobile.findOne({ mobileNumber : body.mobile , verificationCode : body.otp })
			
			if(x.validTillAt < now.valueOf() || !x){
					//otp expire
					return success(res,"Otp is Expired", {});
			}else{

				console.log('decoded 1=>',x, "===========>>", x.validTillAt < now.valueOf());

				const decoded = await verifyTempToken(body.token);
					// If the token is valid, the decoded object will contain the payload data
				console.log('decoded 2=>',decoded);
				if(!decoded){
					return  success(res,"Token is Expired", {});
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
				 const token = await signInToken(user)

				 console.log('perm-token==>>', token);

				 let userJSON = {
					token : token
				}

				return  success(res,"Registration successfully completed", userJSON);
				
			}
			
		} catch (err) {
			return res.send(err);
		} 	
    }; 

    async resendOtp(req, res) {  
        try {
			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);
			console.log('params 3==>>', body)

			let user = await Users.findOne({ mobile : body.mobile, isDeleted : false })

			if(!user){
				return  success(res,"Mobile number is not exist", {});
			}else{
				let otp = await generateOTP(4);
				let tempMobile =new TempMobile();
					tempMobile.mobileNumber = body.mobile,
					tempMobile.verificationCode = otp,
					tempMobile.validTillAt = fiveMinutesLater.valueOf()
					await tempMobile.save();

					const token = await signInTempToken(user)

					let userJSON = {
						mobile : user.mobile,
						token : token,
						otp : otp
					}
	
					return  success(res,"Otp sent on your registred mobile", userJSON);

			}
		} catch (err) {
			return  Error(res, err);
		}  
    }; 

	async forgetPassword(req, res) {  
        try {
			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);

			let user = await Users.findOne({ 
				$or : [
					{
						email : body.email,
					},
					{
						mobile : body.email
					}
				],
				isDeleted : false
			 })

			if(!user){
				return  success(res,"User not exist", {});
			}else{
				

				let otp = await generateOTP(4);
				let tempMobile =new TempMobile();
					tempMobile.mobileNumber = user.mobile,
					tempMobile.verificationCode = otp,
					tempMobile.validTillAt = fiveMinutesLater.valueOf()
					await tempMobile.save();

					const token = await signInTempToken(user)

					let userJSON = {
						mobile : user.mobile,
						token : token,
						otp : otp
					}
	
					return  success(res,"Otp sent on your registred mobile", userJSON);

			}
		} catch (err) {
			return  Error(res, err);
		}  
    }; 

	async changePassword(req, res) {  
        try {
			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);

			let user = await Users.findOne({ _id : res.user._id, isDeleted : false })
			
			if (!user) {
				return  success(res,"user not found", {});
			}
			const isMatch = await bcrypt.compare(body.currentPassword, user.password);
			if (!isMatch) {
				return  success(res,"Invalid password", {});
			}else{
				const hashedPassword = await bcrypt.hash(body.newPassword);
				user.password = hashedPassword;
				await user.save();

				return  success(res,"Password changed successfully", {});
			}

		} catch (err) {
			return  Error(res, err);
		}  
    }; 

	async logout(req, res) {  
        try {
            res.session = null;
            res.user = null;

            console.log('res.user', res.user)

			return  success(res,"Logged out", {});
            
		} catch (err) {
			return Error(res, err);
		}  
    }; 

}

module.exports = new authController() ;