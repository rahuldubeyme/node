exports.randomNumber = function (length) {
	var text = "";
	var possible = "123456789";
	for (var i = 0; i < length; i++) {
		var sup = Math.floor(Math.random() * possible.length);
		text += i > 0 && sup == i ? "0" : possible.charAt(sup);
	}
	return Number(text);
};


exports.generateOTP = function (length) {
		const digits = '0123456789';
		let OTP = '';
		for (let i = 0; i < 6; i++) {
		  OTP += digits[Math.floor(Math.random() * 10)];
		}
		return OTP;
};
