exports.adminDashboard = (req, res) => {
  res.render('admin/dashboard', { user: req.session.user });
};

exports.employeeDashboard = (req, res) => {
  res.render('employee/dashboard', { user: req.session.user });
};

exports.managerDashboard = (req, res) => {
  res.render('manager/dashboard', { user: req.session.user });
};
