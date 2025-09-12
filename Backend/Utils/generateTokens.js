const jwt = require('jsonwebtoken');

const generateTokens = (user)=> {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role,},
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );

    const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );

    return { accessToken, refreshToken };
}

module.exports = generateTokens;