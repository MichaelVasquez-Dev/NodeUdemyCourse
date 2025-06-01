const { verifyToken } = require("../helpers/token.helper")

const validateJWT = (req, res, next) => {

    const headers = req.headers['authorization'];
    if (!headers) return res.status(401).json({ msg: "Unauthorized" });

    const token = headers.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ msg: "Unauthorized" });

    req.user = decoded;
    next();
}

module.exports = {
    validateJWT
}