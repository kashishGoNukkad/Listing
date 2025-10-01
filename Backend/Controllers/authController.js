const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateTokens = require('../Utils/generateTokens');
const authModel = require('../Models/authModel');
const nodemailer = require('nodemailer');

const signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  const missingFields = !username? 'username' : !email? 'email' : !password? 'password' : !role? 'role' : null;
  if (missingFields) return res.status(400).json({message: `please provide ${missingFields}`});

  const existingUser = await authModel.findOne({ email })
  if (existingUser) return res.status(400).json({message: 'Email already exist'});
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new authModel ({
    username,
    email,
    password: hashedPassword,
    role
  })

  await newUser.save();
  res.status(201).json({message: 'User Saved Successfully.'});
};

const login = async (req, res) => {

    const{ email, password } = req.body;

    const user = await authModel.findOne({ email });
    if(!user) return res.status(400).json({message: 'Invalid Credentials.'})

    const isMatch = await bcrypt.compare( password, user.password);
    if(!isMatch) return res.status(400).json({message: 'Invalid password.'});

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, {httpOnly: true, secure: true, sameSite: 'strict'});
    res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: 'strict'});

    // return res.status(200).json({message: 'Login Successfully', user: { username: user.username, email: user.email, role: user.role, refreshToken: user.refreshToken }});
    return res.status(200).json({
        message: 'Login Successfully',
        user: {
            username: user.username,
            email: user.email,
            role: user.role,
            refreshToken: user.refreshToken,
            features: user.features || {}
        }
    });
};

const refresh = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token available.' });

    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await authModel.findById(payload.id);
        
        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const { accessToken, refreshToken } = generateTokens(user);
        
        // Update the refreshToken in database
        user.refreshToken = refreshToken;
        await user.save();

        // Set the new refreshToken in HTTP-only cookie
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Return the new accessToken and user data
        return res.json({
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({message: 'No refresh token available.'});

    const user = await authModel.findOne({ refreshToken: req.cookies.refreshToken });
    if (user) {
        user.refreshToken = '';
        await user.save();
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({message: 'Logged out successfully.'});
};

const addUser = async (req, res) => {
    try {
        const { username, email, password, role, features } = req.body;

        const missingFields = !username? 'username' : !email? 'email' : !password? 'password' : !role? 'role' : null;
        if (missingFields) return res.status(400).json({message: `please provide ${missingFields}`});

        const existingUser = await authModel.findOne({ email });
        if (existingUser) return res.status(400).json({message: 'Email already exist'});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new authModel({
            username,
            email,
            password: hashedPassword,
            role,
            features: features || {}
        });

        await newUser.save();
        res.status(201).json({message: 'User added successfully.', user: { username, email, role, features }});
    } catch (error) {
        console.error('Add user error:', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await authModel.find().sort({ created_at: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  const user = await authModel.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found.' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset.</p>
           <p>Click the link below to reset your password:</p>
           <a href="http://localhost:3000/reset-password">Reset Password</a>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required.' });
  }

  const user = await authModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Failed to reset password.' });
  }
};


// Edit user controller
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, features } = req.body;
    const user = await authModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (features) user.features = features;
    

    await user.save();
    res.status(200).json({ message: 'User updated successfully.', user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      features: user.features
    }});
  } catch (error) {
    console.error('Edit user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await authModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    user.deleted = true;
  // user.password = 'deleted_user_password';
  // user.features = {};
  // // user.role = 'user'; 
  // user.refreshToken = '';
  await user.save();
  res.status(200).json({ message: 'User access removed, user retained in database.' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  signup,
  login,
  refresh,
  logout,
  addUser,
  getAllUsers,
  forgotPassword,
  resetPassword,
  editUser,
  deleteUser
};
