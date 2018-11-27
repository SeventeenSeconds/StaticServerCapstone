const fs = require('fs');
const path = require('path');

//TODO: Change after downloading project on pi
hotPath = 'C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving/';
coldPath = 'C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Cold Serving/';
const mkdirSync = function (dirPath) {
    try {
        fs.mkdirSync(dirPath);
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
};

const mkdirpSync = function (dirPath) {
    const parts = dirPath.split(path.sep);
    for (let i = 1; i <= parts.length; i++) {
        mkdirSync(path.join.apply(null, parts.slice(0, i)));
    }
};

exports.createProjectDirectories = function (username, projectTitle) {
    mkdirpSync(path.resolve(coldPath + username + "/" + projectTitle));
    mkdirpSync(path.resolve(hotPath + username + "/" + projectTitle));
};

exports.createUserDirectories = function (username) {
    mkdirpSync(path.resolve(coldPath + username));
    mkdirpSync(path.resolve(hotPath + username));
};
