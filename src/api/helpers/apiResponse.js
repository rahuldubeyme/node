
function success(res, msg, data) {
	var resData = {
		status: 1,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

function Error(res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(500).json(data);
};

function notFound(res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(404).json(data);
};

function validation(res, msg, data) {
	var resData = {
		status: 0,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};

function unauthorized(res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(401).json(data);
};

module.exports = {
	success,
	Error,
	notFound,
	validation,
	unauthorized
  };