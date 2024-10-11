const express = require('express');
const router = express.Router();
const staticController = require('../controllers/staticController');
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const { ensureAuthenticated, ensureRole } = require('../middlewares/authMiddleware');

// Static Routes
router.get('/', staticController.getHomePage);

// Auth Routes
router.get('/login', authController.getLoginPage);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.postRegister);
router.get('/logout', authController.logout);

// Admin Routes
router.get('/admin/dashboard', ensureAuthenticated, ensureRole('admin'), dashboardController.adminDashboard);
router.get('/admin/profile', ensureAuthenticated, ensureRole('admin'), dashboardController.adminProfileDashboard);

// Manager Routes
router.get('/manager/dashboard', ensureAuthenticated, ensureRole('manager'), dashboardController.managerDashboard);

// Employee Routes
router.get('/employee/dashboard', ensureAuthenticated, ensureRole('employee'), dashboardController.employeeDashboard);
router.get('/employee/profile', ensureAuthenticated, ensureRole('employee'), dashboardController.employeeProfileDashboard);

module.exports = router;
