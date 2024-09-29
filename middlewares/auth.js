const jwt = require('jsonwebtoken');
const prisma = require("../libs/prisma");
require("dotenv").config();

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token is required. Please login first' }); 
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const existingUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { token: true },
        });

        if (!existingUser || existingUser.token !== token) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error authenticating token:', error);
        return res.status(500).json({ success: false, message: 'Something went wrong' }); 
    }
};



module.exports = { authenticate };

