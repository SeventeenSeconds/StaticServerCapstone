const fs = require('fs');
const path = require('path');

hotPath = 'C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving/';

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

exports.createProjectDirectories = function (userEmail, projectTitle) {
    mkdirpSync(path.resolve(hotPath + userEmail + "/" + projectTitle));
};

exports.createUserDirectories = function (userEmail) {
    mkdirpSync(path.resolve(hotPath + userEmail));
};
