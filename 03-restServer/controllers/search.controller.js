const { isValidObjectId } = require("mongoose");
const { UserModel, CategoryModel, ProductModel } = require("../models/modelsDB");
// const { ObjectId } = require("mongoose").Types;

const collectionsPermitted = [
    "categories",
    "products",
    "roles",
    "users",
];

const searchUser = async (term = '', res) => {
    // const isMongoId = ObjectId.isValid(term);
    const isMongoId = isValidObjectId(term);

    if (isMongoId) {
        const user = await UserModel.findById(term);
        return res.json({ results: (user) ? [user] : []});
    } else {
        const regex = new RegExp(term, 'i');
        const users = await UserModel.find({
            $or: [{ name: regex },{ email: regex }],
            $and: [{ state: true }]
        });

        return res.json({ results: users });
    }
}

const searchProduct = async (term = '', res) => {
    const products = await ProductModel.find({
        name: new RegExp(term, 'i'),
        state: true
    }).populate('user', 'name').populate('category', 'name');

    return res.json({ results: products });
}

const searchCategory = async (term = '', res) => {
    const categories = await CategoryModel.find({
        name: new RegExp(term, 'i'),
        state: true
    });

    return res.json({ results: categories });
}



const searchInDb = (req, res) => {
    try{

        const { collection, term } = req.params;

        if (!collection || !collectionsPermitted.includes(collection)) return res.status(400).json({ message: "Invalid collection" });

        switch (collection) {
            case "categories":
                searchCategory(term, res);
                break;
            case "products":
                searchProduct(term, res);
                break;
            case "users":
                searchUser(term, res);
                break;
            default:
                return res.status(500).json({ message: "Search functionality for this collection is not implemented yet" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    searchInDb
};