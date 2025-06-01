const bcryptjs = require("bcryptjs");
const { UserModel } = require("../models/modelsDB/index");



const getAllUsers = async (req, res) => {
    try {
        console.log(req.query);
        const { limit = 5, offset = 0 } = req.query;

        if (isNaN(limit) || isNaN(offset)) return res.status(400).json({ msg: "Limit and offset must be numbers" });

        // const total = await UserModel.countDocuments({ state: true })
        // const users = await UserModel.find({ state: true }).skip(Number(offset)).limit(Number(limit))

        const [total, users] = await Promise.all([
            await UserModel.countDocuments({ state: true }),
            await UserModel.find({ state: true }).skip(Number(offset)).limit(Number(limit))
        ])

        res.json({ total, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findById(id)
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json({ data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const createUser = async (req, res) => {
    try {        
        const { name, email, password, img, role } = req.body;       

        const hashPassword = bcryptjs.hashSync(password, 10);

        const user = await UserModel.create({ name, email, password: hashPassword, img, role });
        if (!user) return res.status(400).json({ msg: "Bad Request" });

        res.status(201).json({ data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, google, email, _id, ...rest} = req.body;

        console.log("req.user",req.user);

        if (password) {
            const hashPassword = bcryptjs.hashSync(password, 10);
            rest.password = hashPassword;
        }
        const user = await UserModel.findByIdAndUpdate(id, { ...rest }, { new: true });
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json({ data: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndUpdate(id, { state: false }, { new: true });
        if (!user) return res.status(404).json({ msg: "User not found" });
        res.json({ data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}

