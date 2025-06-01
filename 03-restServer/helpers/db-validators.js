const { CategoryModel, UserModel, RoleModel, ProductModel } = require("../models/modelsDB");

const RoleIsValid = async (role = "") => {
    const exist = await RoleModel.findOne({ role });
    if (!exist) {
        throw new Error(`Role ${role} is not registered in the database`);
    }
};

const emailExists = async (email = "") => {
    const userExists = await UserModel.findOne({ email });
    if (userExists) throw new Error(`Email ${email} already exists in the database`);

}

const searchUserById = async (id) => {
    const userExists = await UserModel.findById({ _id: id });
    if (!userExists) throw new Error(`User with id ${id} does not exist in the database`);
}

const searchCategoryById = async (id) => {
    const categoryExists = await CategoryModel.findById({ _id: id });
    if (!categoryExists) throw new Error(`Category with id ${id} does not exist in the database`);
}

const searchProductById = async (id) => {
    const productExists = await ProductModel.findById({ _id: id });
    if (!productExists) throw new Error(`Product with id ${id} does not exist in the database`);
}

const collecttionPermitted = (collection, collections = []) => {
    if (!collections.includes(collection)) throw new Error(`Collection ${collection} is not permitted`);
    
    return true;
}




module.exports = {
    RoleIsValid,
    emailExists,
    searchUserById,
    searchCategoryById,
    searchProductById,
    collecttionPermitted
};