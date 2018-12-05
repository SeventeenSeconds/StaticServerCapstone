const fs = require('fs');
const path = require('path');

hotPath = '/home/pi/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving/';

const mkdirSync = function (dirPath) {
    try {
console.log("Attempting to add path " + dirPath + " as user direc"); 
        fs.mkdirSync(dirPath);
    } catch (err) {
	console.log("error creating directory");
	console.log(err.code);  
        //if (err.code !== 'EEXIST') throw err;
    }
};

const mkdirpSync = function (dirPath) {
    //const parts = dirPath.split(path.sep);
    //for (let i = 1; i <= parts.length; i++) {
    //    mkdirSync(path.join.apply(null, parts.slice(0, i)));
    //}
	mkdirSync(dirPath); 
};

exports.createProjectDirectories = function (userEmail, projectTitle) {
    mkdirpSync(path.resolve(hotPath + userEmail + "/" + projectTitle));
};

exports.createUserDirectories = function (userEmail) {
    mkdirpSync(path.resolve(hotPath + userEmail));
};
