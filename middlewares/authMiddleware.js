const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash('error_msg', 'Please log in to access this resource');
  res.redirect('/login');
};

const ensureRole = (role) => {
  return (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      return next();
    } else {
      res.status(403).send('Access Denied');
    }
  };
};

module.exports = { ensureAuthenticated, ensureRole };
