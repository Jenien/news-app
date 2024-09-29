const express = require('express');
const { registerUser, login,getAllUsers, registerAdmin } = require('../controllers/userController');
// const { authenticateToken } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/admin/register',registerAdmin)
router.post('/login', login);
router.get('/alluser', getAllUsers);

module.exports = router;
