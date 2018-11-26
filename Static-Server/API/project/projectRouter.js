const express = require('express');
const router = express.Router();
// const path = 'C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving/';
const multer = require('multer');
const upload = multer({destination: 'C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving/'});
const projectController = require('./projectController');


router.post("/uploadProject", upload.single('file'), projectController.uploadProject);



module.exports = router;