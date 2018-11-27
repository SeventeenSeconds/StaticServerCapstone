// do i serve my information based on router parameters or body?
exports.uploadProject = function (req, res, next) {

    console.log("Hereee");
    if(req.file){
        console.log("single file uploading");
    }

    if (req.files) {
        console.log(req.files);
        // req.files.forEach(file => {
        //     console.log(file.name);
        // });
        console.log('Uploading file...');
        // console.log(req.file);
        // console.log(req.file.path);

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