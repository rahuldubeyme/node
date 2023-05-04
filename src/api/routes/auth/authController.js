const { Users, TempMobile } = require('../../../../models'); 
const jwt = require("jsonwebtoken");  
const request = require('request');
var apiResponse = require("../../helpers/apiResponse");

const utility = require('../../helpers/utility');
const now = new Date();
const fiveMinutesLater = new Date(now.getTime() + (5 * 60 * 1000));


class authController{

	
    async login(req, res) {          
		try {

			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);

			console.log("===============>>>>login", body);
			Users.findOne({email : req.body.email}).then(user => {
				if (user) {
					//Compare given password with db's hash.
					bcrypt.compare(req.body.password,user.password,function (err,same) {
						if(same){
							//Check account confirmation.
							if(user.isConfirmed){
								// Check User's account active or not.
								if(user.status) {
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
									return apiResponse.successResponseWithData(res,"Login Success.", userData);
								}else {
									return apiResponse.unauthorizedResponse(res, "Account is not active. Please contact admin.");
								}
							}else{
								return apiResponse.unauthorizedResponse(res, "Account is not confirmed. Please confirm your account.");
							}
						}else{
							return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
						}
					});
				}else{
					return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
				}
			});
		} catch (err) {
			console.log("error==>", err)
			return apiResponse.ErrorResponse(res, err);
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

					const token = utility.signInToken(user)

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

    async verifyConfirm(req, res) {  
        try {

			let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);

			let x = await TempMobile.findOne({ mobileNumber : body.mobile , verificationCode : body.otp })

			if(x.validTillAt < now.valueOf()){
					//otp expire
			}else{

			}

			console.log('======verify otp==>>', body);


			return 0;

				var query = {email : req.body.email};
				UserModel.findOne(query).then(user => {
					if (user) {
						//Check already confirm or not.
						if(!user.isConfirmed){
							//Check account confirmation.
							if(user.confirmOTP == req.body.otp){
								//Update user as confirmed
								UserModel.findOneAndUpdate(query, {
									isConfirmed: 1,
									confirmOTP: null 
								}).catch(err => {
									return apiResponse.ErrorResponse(res, err);
								});
								return apiResponse.successResponse(res,"Account confirmed success.");
							}else{
								return apiResponse.unauthorizedResponse(res, "Otp does not match");
							}
						}else{
							return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
						}
					}else{
						return apiResponse.unauthorizedResponse(res, "Specified email not found.");
					}
				});
			}
		} catch (err) {
			return apiResponse.Error(res, err);
		} 
    }; 

    async resendConfirmOtp(req, res) {  
        try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}else {
				var query = {email : req.body.email};
				UserModel.findOne(query).then(user => {
					if (user) {
						//Check already confirm or not.
						if(!user.isConfirmed){
							// Generate otp
							let otp = utility.randomNumber(4);
							// Html email body
							let html = "<p>Please Confirm your Account.</p><p>OTP: "+otp+"</p>";
							// Send confirmation email
							mailer.send(
								constants.confirmEmails.from, 
								req.body.email,
								"Confirm Account",
								html
							).then(function(){
								user.isConfirmed = 0;
								user.confirmOTP = otp;
								// Save user.
								user.save(function (err) {
									if (err) { return apiResponse.ErrorResponse(res, err); }
									return apiResponse.successResponse(res,"Confirm otp sent.");
								});
							});
						}else{
							return apiResponse.unauthorizedResponse(res, "Account already confirmed.");
						}
					}else{
						return apiResponse.unauthorizedResponse(res, "Specified email not found.");
					}
				});
			}
		} catch (err) {
			return apiResponse.ErrorResponse(res, err);
		}  
    }; 


}

module.exports = new authController() ;