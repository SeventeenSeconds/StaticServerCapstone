const fs = require('fs');
const path = require('path');

//TODO: Change after downloading project on pi
hotPath = 'C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving/';
coldPath = 'C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Cold Serving/';
const mkdirSync = function (dirPath) {
    try {
        fs.mkdirSync(dirPath);
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
};

const mkdirpSync = function (dirPath) {
    const parts = dirPath.split(path.sep)

    // For every part of our path, call our wrapped mkdirSync()
    // on the full path until and including that part
    for (let i = 1; i <= parts.length; i++) {
        mkdirSync(path.join.apply(null, parts.slice(0, i)))
    }
}

exports.uploadProject = function (req, res, next) {
    if (req.body) {
        var projectTitle = req.body.projectTitle;
        console.log(projectTitle);
        if (req.files) {
            // create project folder in hot and cold storage
            console.log("Attempting to create directory");
            mkdirpSync(path.resolve(hotPath + projectTitle));

            req.files.forEach(file => {
                console.log(file);
            });

        } else {
            console.log('No File Uploaded');
        }

    }


    // save files in cold storage

    return res.status(200).json({
        'success': true
    });
    next();
}