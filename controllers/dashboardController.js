const db = require('../config/db');

exports.adminDashboard = (req, res) => {
	const userId = req.session?.user?.id;
	db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
		if (err) return res.status(500).render('500');

		const roleQuery = 'SELECT role, COUNT(*) as total FROM users GROUP BY role';
		db.query(roleQuery, (err, roleResult) => {
			if (err) return res.status(500).render('500');

			const totals = { admin: 0, employee: 0, manager: 0 };
			roleResult.forEach(row => totals[row.role] = row.total);
			
			totals.totalAll = totals.admin + totals.employee + totals.manager;

			res.render('admin/dashboard', {
				site_title: 'Dashboard | E-Manager',
				user: result[0],
				totals
			});
		});
	});
};

exports.adminProfileDashboard = (req, res) => {
	const userId = req.session?.user?.id;
	db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
		res.render('admin/profile', {
			site_title: 'Profile | E-Manager',
			user: result[0],
			error: null 
		});
	});
};

exports.employeeDashboard = (req, res) => {
  res.render('employee/dashboard', { 
		site_title: 'Employee Dashboard | E-Manager',
		user: req.session.user
	});
};

exports.employeeProfileDashboard = (req, res) => {
	const userId = req.session?.user?.id;
	db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
		res.render('employee/profile', {
			site_title: 'Profile | E-Manager',
			user: result[0],
			error: null 
		});
	});
};

exports.managerDashboard = (req, res) => {
  res.render('manager/dashboard', { 
		site_title: 'Manager Dashboard | E-Manager',
		user: req.session.user
	});
};
