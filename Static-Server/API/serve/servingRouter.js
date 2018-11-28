const express = require('express');
const router = express.Router();
const servingController = require('./servingController');

router.post('/serveProject', servingController.serveProject);

module.exports = router;