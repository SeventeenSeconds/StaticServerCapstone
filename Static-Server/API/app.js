const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const db = require('../back-end/mymongo');
const path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('express-session')({secret:"secret shhh", store: store, resave: true, saveUnititialized: true, cookie: {secure:false, maxAge: 900000}}));

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


/*
    Saving user session to Mongo
    * session saves even if the user isn't logged in
 */

var store = new MongoDBStore({
    uri: 'mongodb://emilyparr:capstone2@ds151383.mlab.com:51383/capstone',
    databaseName: 'capstone',
    collection: 'sessions'
});

// var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected!');
});

store.on('connected', function() {
    // storing the session in mongodb
    console.log("saving session");
    store.client;
});

store.on('error', function(error) {
    //TODO: if the db can't connect - handle error somehow
    assert.ifError(error);
    assert.ok(false);
    console.log(error);
});

app.get('/bullshit', function(req, res){
    res.send("hello world");
});

/*
    routing paths
 */

const auth = require('./auth/authRouter');
app.use("/auth", auth);

const project = require('./project/projectRouter');
app.use("/project", project);

const serve = require('./serve/servingRouter');
app.use("/serve", serve);

var p = '/home/pi/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving/';

app.use(express.static(p));

module.exports = app;
