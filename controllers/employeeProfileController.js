const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const fetchUserData = async (req, res, next) => {
    const userId = req.session?.user?.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
        if (err || result.length === 0) {
            return res.render('employee/profile', {
                site_title: 'Profile | E-Manager',
                user: null,
                error: 'User not found.'
            });
        }
        req.user = result[0];
        next();
    });
};

const editProfile = async (req, res) => {
    const { id, full_name, nik, phone, date_of_birth, marital_status, address, npwp, religion } = req.body;

    if (!id || !full_name || !nik || !phone || !date_of_birth || !marital_status || !address || !npwp || !religion) {
        return res.render('employee/profile', {
            site_title: 'Profile | E-Manager',
            user: req.user,
            error: 'All fields are required!'
        });
    }

    try {
        const query = 'UPDATE users SET full_name = ?, nik = ?, phone = ?, date_of_birth = ?, marital_status = ?, address = ?, npwp = ?, religion = ?   WHERE id = ?';
        await db.execute(query, [full_name, nik, phone, date_of_birth, marital_status, address, npwp, religion, id]);
        return res.redirect('/employee/profile');
    } catch (error) {
        return res.render('employee/profile', {
            site_title: 'Profile | E-Manager',
            user: req.user,
            error: 'An error occurred while updating the profile.'
        });
    }
};

const editPicture = async (req, res) => {
    try {
        const oldImageName = req.body.oldImage;

        if (oldImageName) {
            const oldImagePath = path.join(__dirname, '../public/assets/img/users/', oldImageName);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Error deleting old image:', err);
                }
            });
        }

        if (!req.file) {
            return res.render('employee/profile', {
                site_title: 'Profile | E-Manager',
                user: req.user,
                error: 'No file uploaded.'
            });
        }

        const newImageName = req.file.filename;
        const query = 'UPDATE users SET picture = ? WHERE id = ?';
        const userId = req.body.id;

        db.query(query, [newImageName, userId], (error, results) => {
            if (error) {
                return res.render('employee/profile', {
                    site_title: 'Profile | E-Manager',
                    user: req.user,
                    error: 'Database update failed: ' + error.message
                });
            }
            if (results.affectedRows === 0) {
                return res.render('employee/profile', {
                    site_title: 'Profile | E-Manager',
                    user: req.user,
                    error: 'User not found.'
                });
            }
            return res.redirect('/employee/profile');
        });
    } catch (error) {
        return res.render('employee/profile', {
            site_title: 'Profile | E-Manager',
            user: req.user,
            error: 'An error occurred while updating the picture.'
        });
    }
};

const changePassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
        return res.render('employee/profile', {
            site_title: 'Profile | E-Manager',
            user: req.user,
            error: 'All fields are required!'
        });
    }

    if (newPassword !== confirmPassword) {
        return res.render('employee/profile', {
            site_title: 'Profile | E-Manager',
            user: req.user,
            error: 'Passwords do not match!'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const userId = req.session.user.id;

        const query = 'UPDATE users SET password = ? WHERE id = ?';
        await db.execute(query, [hashedPassword, userId]);

        return res.redirect('/employee/profile');
    } catch (error) {
        return res.render('employee/profile', {
            site_title: 'Profile | E-Manager',
            user: req.user,
            error: 'An error occurred while changing the password.'
        });
    }
};

module.exports = {
    fetchUserData,
    editProfile,
    editPicture,
    changePassword,
};
