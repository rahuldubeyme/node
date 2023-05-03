try{

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var apiResponse = require("./helpers/apiResponse");
var cors = require("cors");
var apiRouter = require("./routes");
var app = express();

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});

var app = express();

//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
app.use(cors());
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');


// Load Swagger YAML file
const swaggerDocument = YAML.load('./src/api/docs/swagger.yaml');

// Mount Swagger UI middleware
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routers
app.use("/", apiRouter);


app.post('/auth/login', (req, res) => {
	console.log('API endpoint hit');
	res.send('Response from API endpoint');
  });



// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

/* port listening for api */
const port = process.env.APIPORT;
console.log(`Your port is ${port}`);
const hostname = 'localhost';

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
 


module.exports = app;

}catch(erro){

	const cwd = process.cwd();
console.log("Current working directory:", cwd);

		console.log('erro==>>', erro)
}
