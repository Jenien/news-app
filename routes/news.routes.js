const express = require('express');
const router = express.Router();
const { createNews, getAllNews,deleteNews,searchNews, updateNews } = require('../controllers/news.controller');
const { authenticate } = require('../middlewares/auth');

// Create new News
router.post('/add', authenticate, createNews);
router.get('/All', getAllNews);
// router.get('/:id', getNewsById);
router.get('/search?', searchNews);
router.delete('/:id', authenticate,deleteNews);
router.put('/edit/:id', authenticate, updateNews);


module.exports = router;