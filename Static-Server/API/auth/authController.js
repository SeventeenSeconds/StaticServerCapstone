const user = require('../user/userModel');
//const bodyParser = require('body-parser');
//const jsonParser = bodyParser.json();

exports.login = function (req, res) {

    var params = req.body;

    // check if user exists
    var query = user.where({"email": params.email});
    query.findOne(function (err, u) {
        if (err) {
            return res.status(500).json({
                'success': false,
                'message': "User could not be retrieved."
            });
        }
        if (u !== null) {
            console.log("User found!");
            //TODO: need to decrypt the password coming out
            if(u.password == params.password) {
                // set session
                // send the user information back somehow?
                // do i send the projects?
                // user object? I'm unsure how to let my project know what's up
                return res.status(200).json({
                    'success': true,
                    'user': u
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
    if (!req.emailValue) {
        return res.status(400).json({
            'success': false,
            'message': "valid email required"
        });
    }
    return res.json({
        'success': true,
        'data': {
            'user': user
        }
    });
}


// app.post('/login', (req, res) => {
//     // check for user existence:
//     // call db
//
//     // if user exists
//     // if passwords match
//
//     // else
//     // else
//
//
//
// });