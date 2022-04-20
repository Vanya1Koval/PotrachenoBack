const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './files/');
    },
    filename: function(req, file, cb) {
        const arr = file.originalname.split('.');
        cb(null, uuid.v4() + '.' + arr[arr.length - 1]);
    }
});

const uploadFile = multer({ storage: storage}).single('filedata');

module.exports = { storage, uploadFile };