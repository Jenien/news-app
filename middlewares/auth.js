const jwt = require('jsonwebtoken');
const prisma = require("../libs/prisma");
require("dotenv").config();

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ success: false, message: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }
        
        req.user = decoded; 
        next();
    });
};
const authorize = (roles) => {
    return (req, res, next) => {
      // Periksa apakah user memiliki role admin
      if (req.user.role === 'admin') {
        return next(); // Jika user adalah admin, lanjutkan ke endpoint berikutnya
      }
  
      // Jika user bukan admin, cek apakah role ada di daftar roles yang diperbolehkan
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden: Access denied' });
      }
  
      next();
    };
  };
  

module.exports = { authenticate , authorize };

