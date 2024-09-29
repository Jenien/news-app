const jwt = require("jsonwebtoken");
const prisma = require("../libs/prisma");
require("dotenv").config();

// Create new Category
const createCategory = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id; 
    const userRole = req.user.role; 
    try {

        if (userRole !== 'ADMIN') {
            return res.status(403).json({ message: "Access denied. Only ADMINs can create categories." });
        }


        const existingCategory = await prisma.Category.findUnique({
            where: { name },
        });

        if (existingCategory) {
            return res.status(409).json({ error: 'Category name already exists' });
        }

        const category = await prisma.Category.create({
            data: {
                name,
                createdById: userId,
            },
        });

        const user = await prisma.User.findUnique({
            where: { id: userId },
            select: { name: true , role: true } 
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: {
                category,
                createdBy: user, 
            },
        });
    } catch (error) {
        console.error("Error creating Category:", error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


const deleteCategory = async (req, res) => {
    const userId = req.user.id; 
    const userRole = req.user.role;
    const { id } = req.params; 

    console.log(`User ID: ${userId}, Category ID: ${id}`); 
    try {
        // Cek apakah pengguna adalah ADMIN
        if (userRole !== 'ADMIN') {
            return res.status(403).json({ 
                success: false, 
                message: "Access denied. Only ADMINs can delete categories." 
            });
        }

        const parsedCategoryId = parseInt(id, 10);
        if (isNaN(parsedCategoryId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid category ID' 
            });
        }

        const category = await prisma.category.findUnique({
            where: {
                id: parsedCategoryId,
            },
        });

        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: 'Category not found' 
            });
        }

        const deletedCategory = await prisma.category.delete({
            where: {
                id: parsedCategoryId, 
            },
        });

        console.log(`Category with ID ${id} deleted successfully`);

        res.status(200).json({
            success: true,
            message: `Category with ID ${id} deleted successfully`,
            data: {
                id: deletedCategory.id,
                name: deletedCategory.name,
                createdAt: deletedCategory.createdAt,
                updatedAt: deletedCategory.updatedAt,
            },
        }); 
    } catch (error) {
        console.error('Error deleting Category:', error); 
        res.status(500).json({ 
            success: false, 
            error: 'Something went wrong' 
        });
    }
};


// Get Category
const getAllCategory = async (req, res) => {
    try {
        const Categorys = await prisma.Category.findMany();
        res.status(200).json(Categorys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id; 
    const userRole = req.user.role; 
    const { id } = req.params; 

    console.log(`User ID: ${userId}, Category ID: ${id}`); 
    try {
        // Cek apakah pengguna adalah ADMIN
        if (userRole !== 'ADMIN') {
            return res.status(403).json({ 
                success: false, 
                message: "Access denied. Only ADMINs can update categories." 
            });
        }

        const parsedCategoryId = parseInt(id, 10);
        if (isNaN(parsedCategoryId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid category ID' 
            });
        }
        const category = await prisma.category.findUnique({
            where: {
                id: parsedCategoryId,
            },
        });

        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: 'Category not found' 
            });
        }

        if (name && name !== category.name) {
            const existingCategory = await prisma.category.findUnique({
                where: { name },
            });

            if (existingCategory) {
                return res.status(409).json({ 
                    success: false, 
                    message: 'Category name already exists' 
                });
            }
        }

        // Update kategori
        const updatedCategory = await prisma.category.update({
            where: {
                id: parsedCategoryId, 
            },
            data: {
                name: name || category.name, 
            },
            include: {
                createdBy: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        console.log(`Category with ID ${id} updated successfully`);

        res.status(200).json({
            success: true,
            message: `Category with ID ${id} updated successfully`,
            data: {
                id: updatedCategory.id,
                name: updatedCategory.name,
                createdAt: updatedCategory.createdAt,
                updatedAt: updatedCategory.updatedAt,
                createdBy: updatedCategory.createdBy.name, 
            },
        }); 
    } catch (error) {
        console.error('Error updating Category:', error); 
        res.status(500).json({ 
            success: false, 
            error: 'Something went wrong' 
        });
    }
};

module.exports = {
    createCategory,
    deleteCategory,
    getAllCategory,
    updateCategory
};