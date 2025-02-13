const jwt = require("jsonwebtoken");
const JWT_SECRET = "crazyboy";

const fetchUser = (req, res, next) => {
    const token = req.header("authtoken");
    if (!token) {
        return res.status(401).json({ error: "Authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        console.log("User ID from token:", req.user.id);
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token, authentication failed" });
    }
};

module.exports = fetchUser;
