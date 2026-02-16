const jwt = require("jsonwebtoken");
const envVariable = require("../config/envVariable");

const adminMiddleware = async function (req, res, next) {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "Login first!" });

    try {
        const decoded = jwt.verify(token, envVariable.ACCESS_TOKEN);
        if (decoded.role !== "admin")
            return res.status(403).json({ message: "Admin only!" });

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = adminMiddleware