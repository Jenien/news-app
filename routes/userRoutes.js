const express = require('express');
const { registerUser,logout, login,getAllUsers, registerAdmin } = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/admin/register',registerAdmin)
router.post('/login', login);
router.post('/logout',authenticate,  logout);
router.get('/alluser', getAllUsers);

module.exports = router;
