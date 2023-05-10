try{
const session = require('express-session');
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var {
	success,
	error,
	notFound,
	validation,
	unauthorized
} = require("./helpers/apiResponse");
var cors = require("cors");
var apiRouter = require("./routes");
var app = express();
const bodyParser = require('body-parser');

// Configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.set('view engine', 'ejs');

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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routers
app.use("/", apiRouter);


app.post('/', (req, res) => {
	console.log('API endpoint hit');
	res.send('Response from API endpoint');
  });

// Set views folder
app.set('views', path.join(__dirname, 'views'));

app.all('/', function(req, res) {
	res.render('home');
});

// throw 404 if URL not found
app.all("*", function(req, res) {
	//res.redirect('/docs')
	//return res.send("Page not found");
	return res.render("404");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return unauthorized(res, err.message);
	}
});

/* store data in session */
app.use(session({
	secret: 'secreteSession',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true } // set this to false if you are not using https
  }));

  app.use((req,res,next) => {
    res.user = req.session.user || {};
    req.token = req.session.token || {};  

    next();
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
