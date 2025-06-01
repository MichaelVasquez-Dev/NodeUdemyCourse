const jwt = require('jsonwebtoken');

const createToken = user => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        img: user.img,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    return token;
}

const verifyToken = token => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = {
    createToken,
    verifyToken
}