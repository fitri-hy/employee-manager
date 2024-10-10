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

// Dashboard Routes
router.get('/admin/dashboard', ensureAuthenticated, ensureRole('admin'), dashboardController.adminDashboard);
router.get('/employee/dashboard', ensureAuthenticated, ensureRole('employee'), dashboardController.employeeDashboard);
router.get('/manager/dashboard', ensureAuthenticated, ensureRole('manager'), dashboardController.managerDashboard);

// Error page
router.use((req, res) => {
  res.status(404).render('404', { 
    site_title: 'Page Not Found | E-Manager',
    site_description: 'The page you are looking for does not exist.',
    site_keywords: '404, page not found',
    author: 'I-As.Dev'
  });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', {
    site_title: 'Internal Server Error | Employees Manager',
    site_description: 'Something went wrong on our end.',
    site_keywords: 'internal server error',
    author: 'I-As.Dev'
  });
});

module.exports = router;
