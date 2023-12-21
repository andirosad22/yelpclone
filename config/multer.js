const multer = require('multer');
const path = require('path');
const ExpressError = require('../utils/ErrorHandle');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    // fungsi untuk memeriksa format file yang di izinkan 
    if(file.mimetype.startsWith('image/')){
      cb(null, true);
    }else{
      cb(new ExpressError('Only image are allowed', 405));
    }
  }
});

module.exports = upload;