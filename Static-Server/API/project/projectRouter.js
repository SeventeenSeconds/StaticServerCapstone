const express = require('express');
const router = express.Router();
const projectController = require('./projectController');

router.post("/projects", projectController.doSomething);

router.get("/projects", projectController.hostProject);

module.exports = router;