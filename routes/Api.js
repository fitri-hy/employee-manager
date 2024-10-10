const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { ensureAuthenticated, ensureRole } = require('../middlewares/authMiddleware');
const profileController = require('../controllers/adminProfileController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/assets/img/users/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Api Admin Profile
router.post('/admin/profile/edit-profile', ensureAuthenticated, ensureRole('admin'), profileController.fetchUserData, profileController.editProfile);
router.post('/admin/profile/edit-picture', upload.single('picture'), ensureAuthenticated, ensureRole('admin'), profileController.fetchUserData, profileController.editPicture);
router.post('/admin/profile/change-password', ensureAuthenticated, ensureRole('admin'), profileController.fetchUserData, profileController.changePassword);

module.exports = router;
