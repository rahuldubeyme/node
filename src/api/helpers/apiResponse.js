
exports.success = function (res, msg, data) {
	var resData = {
		status: 1,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

exports.Error = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(500).json(data);
};

exports.notFound = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(404).json(data);
};

exports.validationError = function (res, msg, data) {
	var resData = {
		status: 0,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};

exports.unauthorized = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(401).json(data);
};