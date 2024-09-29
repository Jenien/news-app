const prisma = require('../libs/prisma');

// Create News (Only Admins)
const createNews = async (req, res) => {
  const { title, content, categoryId } = req.body;
  const authorId = req.user.id; 

  
  if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
          success: false,
          message: 'Access denied. Admins only.',
      });
  }

  try {
      
      const categoryExists = await prisma.category.findUnique({
          where: { id: categoryId },
      });

      if (!categoryExists) {
          return res.status(400).json({
              success: false,
              message: "Invalid category ID",
          });
      }

     
      const titleExists = await prisma.news.findFirst({
          where: { title },
      });

      if (titleExists) {
          return res.status(400).json({
              success: false,
              message: "A news article with this title already exists",
          });
      }

   
      const news = await prisma.news.create({
          data: {
              title,
              content,
              categoryId,
              authorId,
          },
          include: {
              author: { 
                  select: {
                      name: true,
                      role: true,
                  },
              },
              category: true, 
          },
      });

      return res.status(201).json({
          success: true,
          message: "News created successfully",
          data: news,
      });
  } catch (error) {
      console.error('Error creating news:', error);
      return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};


// Delete News (Only Admins)
const deleteNews = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admins only.',
    });
  }

  try {
    const deletedNews = await prisma.news.delete({
      where: { id: parseInt(id, 10) },
      include: {
        category: true, 
        author: true,
      },
    });

    if (!deletedNews) { 
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    return res.status(200).json({ success: true, message: 'News deleted successfully' });
  } 
  catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

// Get All News
const getAllNews = async (req, res) => {
  try {
    const newsList = await prisma.news.findMany({
      include: {
        category: true, 
        author: {
          select: {
            name: true,
            role: true,
          }
        }
      },
    });

    return res.status(200).json({
      success: true,
      data: newsList,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};


// Search News by ID, Title, or Category
const searchNews = async (req, res) => {
  const { id, title, categoryId } = req.query; 

  try {

    const conditions = {};
    
    if (id) {
      conditions.id = parseInt(id, 10); 
    }

    if (title) {
      conditions.title = {
        contains: title, 
        mode: 'insensitive', 
      };
    }

    if (categoryId) {
      conditions.categoryId = parseInt(categoryId, 10); 
    }

    
    const newsList = await prisma.news.findMany({
      where: conditions,
      include: {
        category: true, 
        author: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    });

    if (newsList.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No news found matching the search criteria',
      });
    }

    
    return res.status(200).json({
      success: true,
      data: newsList,
    });
  } catch (error) {
    console.error('Error searching news:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};


// Update News (Only Admins)
const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content, categoryId } = req.body;

 
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admins only.',
    });
  }

  try {
    const news = await prisma.news.update({
      where: { id: parseInt(id, 10) },
      data: { 
        title, 
        content, 
        categoryId 
      },
      include: {
        author: {
          select: {
            name: true,
            role: true,
          }
        },
        category: true, 
        },
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'News not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'News updated successfully',
      data: news, 
    });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};

module.exports = {
  createNews,
  getAllNews,
  searchNews,
  deleteNews,
  updateNews,
};
