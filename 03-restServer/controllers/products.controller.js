const { ProductModel } = require("../models/modelsDB");


const getAllProducts = async (req, res) => {
    try {

        const { limit = 5, offset = 0 } = req.query;

        const products = await ProductModel.find({ state: true, isDeleted: false })
            .limit(Number(limit))
            .skip(Number(offset))
            .populate('user', 'name')
            .populate('category', 'name')
 
        res.json({
            message: "Get all products",
            products
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findById(id)
            .populate('user', 'name')
            .populate('category', 'name');

        res.json({
            message: `Get product with ID ${id}`,
            product 
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, category, price, stock, description } = req.body;

        console.log(req.user);

        const product = await ProductModel.create({
            name,
            user: req.user.id,
            category,
            price,
            stock,
            description,
            state: !!stock
        })

        res.json({
            message: "Product created successfully",
            product
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, stock, description } = req.body;

        const product = await ProductModel.findByIdAndUpdate(id, {
            name,
            category,
            price,
            stock,
            description,
            state: !!stock
        }, { new: true });

        res.json({
            message: `Product with ID ${id} updated successfully`,
            product
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await ProductModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

        res.json({
            message: `Product with ID ${id} deleted successfully`
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
