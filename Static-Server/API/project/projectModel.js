const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var projectSchema = new Schema({
    username: String,
    projects: [String]
});

const User = mongoose.model('user', userSchema);

module.exports = User;