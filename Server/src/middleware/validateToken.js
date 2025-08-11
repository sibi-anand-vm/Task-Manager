const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error("Invalid Token or Token not found");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded.user;
        next();
    } catch (err) {

        if (err.name === 'TokenExpiredError') {
            res.status(401);
            throw new Error("Token expired. Please login again.");
        }

        res.status(403);
        throw new Error("Unauthorized access");
    }
});

module.exports = validateToken;
