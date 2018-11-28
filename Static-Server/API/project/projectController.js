const dirUtil = require('../createDirectory');

exports.uploadProject = function (req, res, next) {
    if (req.body) {
        var projectTitle = req.body.projectTitle;
        var userEmail = req.body.userEmail;
        console.log(projectTitle);
        if (req.files) {
            console.log("Attempting to create project directory " +  userEmail);
            dirUtil.createProjectDirectories(userEmail, projectTitle);

            //TODO: save project title to db

            req.files.forEach(file => {
                console.log(file);
            });

        } else {
            console.log('No File Uploaded');
        }
    }

    return res.status(200).json({
        'success': true
    });
    next();
}