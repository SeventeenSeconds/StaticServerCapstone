// do i serve my information based on router parameters or body?

exports.uploadProject = function (req, res, next) {

    if (req.file) {
        console.log('Uploading file...');
        var filename = req.file.name;
        console.log(req.file);
        var uploadStatus = 'File Uploaded Successfully';
    } else {
        console.log('No File Uploaded');
        var filename = 'FILE NOT UPLOADED';
        var uploadStatus = 'File Upload Failed';
    }

    // save file in cold storage

    return res.status(200).json({
        'success': true
    });
    next();
}