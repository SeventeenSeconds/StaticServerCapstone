const User = require('../user/userModel');
var crypto = require("crypto-js");

encriptPassword = password => {
    var encriptedPassword = crypto.AES.encrypt(password, 'bikes 666');
    return encriptedPassword.toString();
}

decrypt = password => {
    var bytes = crypto.AES.decrypt(password.toString(), 'bikes 666');
    var plaintext = bytes.toString(crypto.enc.Utf8);
    return plaintext;
}

var pass = encriptPassword('fake value');

// LOGIN FUNCTION
exports.loginMode = function (req, res) {

    var params = req.body;

    // check if user exists
    var query = User.where({"email": params.email});
    query.findOne(function (err, user) {
        if (err) {
            return res.status(500).json({
                'success': false,
                'message': "User could not be retrieved."
            });
        }
        if (user !== null) {
            console.log("User found!");
            //TODO: need to decrypt the password coming out
            if (user.password == params.password) {
                // set session
                //TODO: return projects object back to client
                // project model - find where project username
                // and return
                return res.status(200).json({
                    'success': true,
                    'user': user
                });
            } else {
                return res.status(409).json({
                    'success': false,
                    'message': "Password was incorrect."
                });
            }
        } else {
            return res.status(409).json({
                'success': false,
                'message': "User could not be found."
            });
        }
    });

};

exports.register = function (req, res) {
    var params = req.body;
    console.log("trying to register " + params.username);

    var newUser = new User({email: params.email, password: params.password, username: params.username});
    newUser.save(function (err) {
        if (err) {
            return res.status(500).json({
                'success': false,
                'message': "User could not be added to the database."
            });
        }

        return res.status(200).json({
            'success': true
        });

    });

    // save the user to the database
    // respond to the user

    // at some point add the user to the session

};

exports.getUsernames = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            res.status(500).json({
                'success': false
            })
        } else {

            var usernames = [];
            var emails = [];

            users.forEach(function (user) {
                usernames.push(user.username);
                emails.push(user.email);
            });

            res.status(200).json({
                'success': true,
                'usernames': usernames,
                'emails': emails
            });
        }

    })
};



