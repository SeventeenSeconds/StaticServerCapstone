const express = require('express');
const router = express.Router();
const authController = require('./authController');

router.get('/getUsernames', authController.getUsernames);

router.post("/loginMode", authController.loginMode);

router.post("/register", authController.register);

module.exports = router;