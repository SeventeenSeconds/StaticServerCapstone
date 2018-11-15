// do i serve my information based on router parameters or body?

exports.hostProject = function(req, res) {

    var params = req.body;

    console.log(params.email);
    console.log(params.projectTitle);

    return res.status(200).json({
        'success': true,
        'message': "Password was incorrect."
    });
}