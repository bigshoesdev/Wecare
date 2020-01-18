const multer =require('multer');
const path =require('path');
const uuid=require('uuid');

//Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() +uuid()+ path.extname(file.originalname));
  }
});


// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init Upload
const upload = multer({
  storage,
  fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).array('file',3);

module.exports = upload;