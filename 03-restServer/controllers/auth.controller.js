const { response } = require("express");
const { compareHash, createHash } = require("../helpers/hash.helper");
const { createToken } = require("../helpers/token.helper");
const { googleVerify } = require("../helpers/googleVerify.helper");
const { UserModel } = require("../models/modelsDB/index");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email, state: true });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const validPassword = compareHash(password, user);
        if (!validPassword) return res.status(400).json({ msg: "Invalid credentials" });

        const token = createToken(user);

        res.json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const signInWithGoogle = async (req, res= response) => {

    const { id_token } = req.body;
    console.log("id_token", id_token);

    try {


        const { name, email, sub, picture } = await googleVerify(id_token)

        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            if (!userExists.state) {
                return res.status(401).json({
                    msg: "User blocked, contact the administrator"
                });
            }
            const token = createToken(userExists);
            return res.json({ user: userExists, token });
        }

        const user = await UserModel.create({
            name,
            email,
            password: createHash(sub),
            role: "USER_ROLE",
            img: picture,
            google: true
        });

        const token = createToken(user);
        res.status(201).json({
            user,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            msg: "Internal Server Error",
            error: error.message
        });
    }
}



module.exports = {
    login,
    signInWithGoogle
}