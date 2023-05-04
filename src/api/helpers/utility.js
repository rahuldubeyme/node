const jwt = require('jsonwebtoken');

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

		return jwt.sign(payload, process.env.JWT_TEMP_SECRET, { expiresIn: '1h' });
	},

	VarifyTempToken: function (token) {
		return jwt.verify(token, process.env.JWT_TEMP_SECRET);
	},
	

	signInToken: function (user) {
		const payload = {
			id: user._id
		};

		return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
	},

	VarifyToken: function (token) {
		return jwt.verify(token, process.env.JWT_SECRET);
	}
};
