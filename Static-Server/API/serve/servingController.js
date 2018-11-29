const express = require('express');
const app = require('../app');
const path = require('path');

exports.serveProject = function (req, res, next) {
    // get username and project name from req body
    var params = req.body;
    var email = params.userEmail;
    console.log(params.email);
    console.log("attempting to serve project");

    var p = 'C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/back-end/projects/Hot Serving/';


    return res.status(200).json({
        'success': true
    });
};