const express = require('express');
const router = express.Router();
const { signup, login, refresh, logout, addUser, getAllUsers, forgotPassword, resetPassword } = require('../Controllers/authController');


router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/adduser', addUser);
router.get('/users', getAllUsers);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


module.exports = router;