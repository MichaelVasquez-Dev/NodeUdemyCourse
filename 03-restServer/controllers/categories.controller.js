const { CategoryModel } = require("../models/modelsDB");


const allCategories = async (req, res) => {

    try {
        const {limit = 5, offset = 0} = req.query;

        if (isNaN(limit) || isNaN(offset)) return res.status(400).json({ message: "Limit and offset must be numbers" });

        const [count, categories] = await Promise.all([
            CategoryModel.countDocuments({ state: true }),
            CategoryModel.find({ state: true })
                .limit(Number(limit))
                .skip(Number(offset))
                .populate("user", "name email")
        ]);

        res.json({
            message: "Categories retrieved successfully",
            count,
            categories,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const categoryById = async (req, res) => {
    try {

        const { id } = req.params;

        const category = await CategoryModel.findById(id).populate("user", "name email");

        if (!category) return res.status(404).json({ message: `Category with ID ${id} not found` });

        res.json({
            message: "Category retrieved successfully",
            category
        });

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const createCategory = async (req, res) => {
    try {
        const {name, user, state} = req.body;

        const categoryDB = await CategoryModel.findOne({ name: name.trim().toUpperCase() });
        if (categoryDB) return res.status(400).json({ message: `Category ${name} already exists` });
        
        const category = await CategoryModel.create({
            name: name.trim().toUpperCase(),
            user,
            state
        })

        res.json({
            message: "Category created successfully",
            category
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, state } = req.body;

        const category = await CategoryModel.findByIdAndUpdate(id, {
            name: name.trim().toUpperCase(),
            state
        }, { new: true });

        res.json({
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteCategory = async (req, res) => {
    try {

        const { id } = req.params;

        const category = await 
        CategoryModel.findByIdAndUpdate(id, { state: false }, { new: true });

        res.json({
            message: "Category deleted successfully",
            category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });   
    }
}

module.exports = {
    allCategories,
    categoryById,
    createCategory,
    updateCategory,
    deleteCategory
};