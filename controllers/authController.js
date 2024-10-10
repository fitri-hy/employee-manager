const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.getLoginPage = (req, res) => {
	res.render('login', { 
		message: req.flash('error_msg'),
		site_title: 'Login | E-Manager',
		site_description: 'Log in to your E-Manager account to access employee management tools.',
		site_keywords: 'login, employee management, HR tools',
		author: 'I-As.Dev'
	});
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('error_msg', 'Please fill in all fields');
    return res.redirect('/login');
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      req.flash('error_msg', 'Invalid credentials');
      return res.redirect('/login');
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        req.session.user = user;
        if (user.role === 'admin') return res.redirect('/admin/dashboard');
        if (user.role === 'employee') return res.redirect('/employee/dashboard');
        if (user.role === 'manager') return res.redirect('/manager/dashboard');
      } else {
        req.flash('error_msg', 'Invalid credentials');
        res.redirect('/login');
      }
    });
  });
};

exports.getRegisterPage = (req, res) => {
  res.render('register', {
		site_title: 'Register | E-Manager',
		site_description: 'Create an account to manage your employees efficiently with E-Manager.',
		site_keywords: 'registration, employee management, HR tools',
		author: 'I-As.Dev'
	});
};

exports.postRegister = (req, res) => {
  const { username, email, password, role } = req.body;
  let errors = [];

  if (!username || !email || !password || !role) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('register', { errors });
  } else {
    db.query('SELECT email FROM users WHERE email = ?', [email], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        errors.push({ msg: 'Email already registered' });
        res.render('register', { errors });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) throw err;
          db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
            [username, email, hash, role], (err, result) => {
              if (err) throw err;
              req.flash('success_msg', 'You are now registered');
              res.redirect('/login');
            });
        });
      }
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/login');
  });
};
