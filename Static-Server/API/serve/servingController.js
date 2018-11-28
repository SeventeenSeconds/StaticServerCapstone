var dir = 'C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving';
express.static(path.resolve())

exports.serveProject = function (req, res, next) {
    // get username and project name from req body
    var params = req.body;
    console.log(params.email);
    console.log("attempting to serve project");
    return res.status(200).json({
        'success': true
    });
};