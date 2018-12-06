const express = require('express');
const router = express.Router();
const projectController = require('./projectController');
const dirUtil = require('../createDirectory');

var path = '/home/pi/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving/';
const multer = require('multer');
const diskUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        var projectTitle = req.body.projectTitle;
        var userEmail = req.body.userEmail;
        dirUtil.createProjectDirectories(userEmail, projectTitle); 
        cb(null, path + userEmail + "/" + projectTitle);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: diskUpload});

router.post("/uploadProject", upload.any(), projectController.uploadProject);

router.post('/deleteProject', projectController.deleteProject);

module.exports = router;

// commit - 2281be9
// 2281be90d4d52b4d5e77c29642f4c4eb58c765a5