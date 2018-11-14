exports.doSomething = function(req, res) {
    console.log(req.body.email);
    if(!req.emailValue) {
        return res.status(404).json({
            'success': false,
            'message': "valid email required"
        });
    }
    return res.json({
        'success': true,
        'data': {
            'user': user
        }
    });
};

// do i serve my information based on router parameters or body?
exports.hostProject = function(req, res) {
    console.log(req.body.username);
    console.log(req.body.projectTitle);

    return res.status(200).json({
        'success': true,
        'message': 'should hold you\'re file is being hosted here'
    });

}