const dirUtil = require('../createDirectory');
const User = require('../user/userModel');

exports.uploadProject = function (req, res, next) {
    if (req.body) {
        var projectTitle = req.body.projectTitle;
        var userEmail = req.body.userEmail;
        var index = req.body.index;
        console.log(index);
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
                    var newProject = {projectTitle: projectTitle, index: index};
                    user.projects.push(newProject);
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

exports.deleteProject = function (req, res) {
    var params = req.body;
    var userEmail = params.userEmail;
    var projectTitle = params.projectTitle;

    var query = User.where({"email": userEmail});
    query.findOne(function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                'success': false,
                'message': "Project could not be deleted."
            });
        }
        if (user !== null) {
            for (var i = 0; i < user.projects.length - 1; i++) {
                if (user.projects[i].projectTitle === projectTitle) {
                    user.projects.splice(i, 1);
                }
            }
            user.save(function (err) {
                if (err) {
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