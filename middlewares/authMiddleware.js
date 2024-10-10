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
      res.status(403).render('403', { 
		site_title: 'Access Denied | E-Manager',
		site_description: 'You do not have permission to access this resource.',
		site_keywords: 'access denied',
		author: 'I-As.Dev'
	  });
    }
  };
};

module.exports = { ensureAuthenticated, ensureRole };
