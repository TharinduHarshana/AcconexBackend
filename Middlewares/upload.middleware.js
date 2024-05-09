const multer = require("multer");

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename for each uploaded file
  }
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
