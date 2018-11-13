// connection
const mongoose = require('mongoose');
const mongoURI = 'mongodb://emilyparr:capstone2@ds151383.mlab.com:51383/capstone';
mongoose.connect(mongoURI);
const dbConnection = mongoose.connection;

module.exports = dbConnection;