const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    projects: [{projectTitle: String, index: String}],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
