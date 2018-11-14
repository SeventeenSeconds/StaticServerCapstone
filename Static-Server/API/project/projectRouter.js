const express = require('express');
const router = express.Router();
const projectController = require('./projectController');

router.post("/", projectController.hostProject);

module.exports = router;