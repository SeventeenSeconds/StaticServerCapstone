const dirUtil = require('../createDirectory');
const User = require('../user/userModel');

exports.uploadProject = function (req, res, next) {
    if (req.body) {
        var projectTitle = req.body.projectTitle;
        var userEmail = req.body.userEmail;
        console.log(projectTitle);
        if (req.files) {

            //TODO: save project title to db
            var query = User.where({"email": userEmail});
            query.findOne(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        'success': false,
                        'message': "Project could not be saved."
                    });
                }
                if (user !== null) {
                    user.projects.push(projectTitle);
                    user.save(function (err) {
                        if (err) {
                            return res.status(500).json({
                                'success': false,
                                'message': "User could not be added to the database."
                            });
                        }
                    });
                }
            });


        } else {
            console.log('No File Uploaded');
        }
    }

    return res.status(200).json({
        'success': true
    });
    next();
};

exports.getUserProjects = function (req, res) {

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