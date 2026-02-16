const jwt = require("jsonwebtoken");
const accessToken = require("../config/envVariable");
const userModel = require("../model/user.model");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "You are not logged in" });
        }

        const decoded = jwt.verify(token, accessToken.ACCESS_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Something went wrong" });
    }
};

module.exports = auth;
