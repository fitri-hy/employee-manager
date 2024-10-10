exports.adminDashboard = (req, res) => {
	res.render('admin/dashboard', { 
		site_title: 'Employee Dashboard | E-Manager',
		user: req.session.user
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
