const express = require('express');
const router = express.Router();
const projectController = require('./projectController');


//TODO: I need to set this up for multiple files as well as change path name to appropriate
//TODO: user project folder depending on hosting or not
var path = 'C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving/test/fakeProject/';
const multer = require('multer');
const diskUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: diskUpload});



router.post("/uploadProject", upload.any(), projectController.uploadProject);



module.exports = router;