const jwt = require('jsonwebtoken');

const VerifyToken = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) return res.status(401).json({ok : false, msg : 'Token not provided'});

    const data = jwt.verify(token, "SECRET-WORD");
    req.user = data;
    next()
} 

module.exports = VerifyToken;