const multer = require("multer");

// Where files will be stored
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }

});


// ✅ File filter for security
const fileFilter = (req, file, cb) => {

    if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF & Images allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;
