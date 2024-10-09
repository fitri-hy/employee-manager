const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.getHomePage = (req, res) => {
	res.render('home', {
		site_title: 'Home | Employees Manager',
		site_description: 'Manage your employees efficiently with our web application.',
		site_keywords: 'employee management, HR tools, workforce management',
		author: 'I-As.Dev'
	});
};