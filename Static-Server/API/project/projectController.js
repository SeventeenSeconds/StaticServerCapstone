// do i serve my information based on router parameters or body?

const express = require('express');
const app = express();

exports.hostProject = function(req, res) {

    var params = req.body;

    console.log(params.email);
    console.log(params.projectTitle);

    app.use(express.static('C:/Users/eparr/Neumont/Quarter 9/Capstone/StaticServerCapstone/Static-Server/testProjects/fakeUsername/Static Website/'));
    return res.status(200).json({
        'success': true,
        'message': "Password was incorrect."
    });
}