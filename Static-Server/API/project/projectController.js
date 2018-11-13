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