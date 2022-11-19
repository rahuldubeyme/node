const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.Promise = global.Promise;
let url = process.env.MONGODB_URL; 
// Connecting to the database

console.log('===>>>', url);

mongoose.connect(url, {
	useNewUrlParser:true,
	useUnifiedTopology:true,
	maxPoolSize:50,
	minPoolSize:10,
	keepAlive:true,
	keepAliveInitialDelay:30000
})
.then(() => {
    console.log("Successfully connected to the database",url);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

/* module.exports = {
    
  }; */
  //const { port } = require('./config'); // require db when u need in which controller