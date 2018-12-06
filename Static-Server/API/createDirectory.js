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
        if (err.code !== 'EEXIST') throw err;
    }
};

const mkdirpSync = function (dirPath) {
	mkdirSync(dirPath); 
};

exports.createProjectDirectories = function (userEmail, projectTitle) {
    mkdirSync(path.resolve(hotPath + userEmail + "/" + projectTitle));
};

exports.createUserDirectories = function (userEmail) {
    mkdirSync(path.resolve(hotPath + userEmail));
};

exports.deleteDirectory = function (path) {	
	deleteFolderRecursive(path); 
}; 

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


