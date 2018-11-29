const dirUtil = require('../createDirectory');
const User = require('../user/userModel');

exports.uploadProject = function (req, res, next) {
    if (req.body) {
        var projectTitle = req.body.projectTitle;
        var userEmail = req.body.userEmail;
        console.log(projectTitle);
        if (req.files) {

            var query = User.where({"email": userEmail});
            query.findOne(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'success': false,
                        'message': "Project could not be saved."
                    });
                }
                if (user !== null) {
                    user.projects.push(projectTitle);
                    user.save(function (err) {
                        if (err) {
                            console.log("saving one");
                            console.log(err);
                            return res.status(500).json({
                                'success': false,
                                'message': "Project could not be added to the database."
                            });
                        } else {
                            return res.status(200).json({
                                'success': true,
                                'projects': user.projects
                            });
                        }
                    });
                }
            });


        } else {
            console.log('No File Uploaded');
        }
    }
};

exports.getUserProjects = function (userEmail) {
    var projects = [];
    var query = User.where({"email": userEmail});
    query.findOne(function (err, user) {
        if (err) {
            console.log(err);
        }

        if (user !== null) {
            console.log('here');
            projects.push(user.projects);
            user.projects.forEach(project => {
                console.log("project " + project);
                projects.push()
            });
            return projects;
        }
    });
};