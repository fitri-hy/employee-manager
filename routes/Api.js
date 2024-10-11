const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { ensureAuthenticated, ensureRole } = require('../middlewares/authMiddleware');
const adminProfileController = require('../controllers/adminProfileController');
const employeeProfileController = require('../controllers/employeeProfileController');

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
router.post('/admin/profile/edit-profile', ensureAuthenticated, ensureRole('admin'), adminProfileController.fetchUserData, adminProfileController.editProfile);
router.post('/admin/profile/edit-picture', upload.single('picture'), ensureAuthenticated, ensureRole('admin'), adminProfileController.fetchUserData, adminProfileController.editPicture);
router.post('/admin/profile/change-password', ensureAuthenticated, ensureRole('admin'), adminProfileController.fetchUserData, adminProfileController.changePassword);

// Api Admin Profile
router.post('/employee/profile/edit-profile', ensureAuthenticated, ensureRole('employee'), employeeProfileController.fetchUserData, employeeProfileController.editProfile);
router.post('/employee/profile/edit-picture', upload.single('picture'), ensureAuthenticated, ensureRole('employee'), employeeProfileController.fetchUserData, employeeProfileController.editPicture);
router.post('/employee/profile/change-password', ensureAuthenticated, ensureRole('employee'), employeeProfileController.fetchUserData, employeeProfileController.changePassword);

module.exports = router;
