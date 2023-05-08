const { Users } = require('../../../../models'); 
var apiResponse = require("../../helpers/apiResponse");
const { ObjectId } = require('mongodb');

class usersController{
 
    async userPage(req, res) {  
        try {
            const { user } = res.user;
            let params = req.body || {} && req.params || {} && req.query || {};
			const body = Object.assign({}, params);
            const userData = res.session;
            console.log("res.user ==>",res.user._id, "11==>>",  user)
			

			let users = await Users.findOne({ _id : res.user._id, isDeleted : false })

            console.log('users==>', users);

			if(!users){
				return apiResponse.warn(res,"User not exist", {});
			}else{
					let userJSON = {
						users : users
					}
	
					
                    return apiResponse.success(res,"User get profile.", users);
			}
            
		} catch (err) {
			return Error(res, err);
		}  
    }; 


    async logout(req, res) {  
        try {
            res.session = null;
            res.user = null;

            console.log('res.user', res.user)

			return apiResponse.success(res,"Logged out", {});
            
		} catch (err) {
			return Error(res, err);
		}  
    };   


}

module.exports = new usersController()