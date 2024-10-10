const db = require('../config/db');

exports.adminDashboard = (req, res) => {
	const userId = req.session?.user?.id;
	db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
		res.render('admin/dashboard', {
			site_title: 'Dashboard | E-Manager',
			user: result[0]
		});
	});
};
exports.adminProfileDashboard = (req, res) => {
	const userId = req.session?.user?.id;
	db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
		res.render('admin/profile', {
			site_title: 'Profile | E-Manager',
			user: result[0]
		});
	});
};


exports.employeeDashboard = (req, res) => {
  res.render('employee/dashboard', { 
		site_title: 'Employee Dashboard | E-Manager',
		user: req.session.user
	});
};


exports.managerDashboard = (req, res) => {
  res.render('manager/dashboard', { 
		site_title: 'Manager Dashboard | E-Manager',
		user: req.session.user
	});
};
