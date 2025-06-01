const { Router } = require("express");
const { login, signInWithGoogle } = require("../../controllers/auth.controller");
const { check } = require("express-validator");
const { validate } = require("../../middlewares/validate.middleware");


const routes = Router();

routes.post("/login", [
    check("email", "Invalid credentials").isEmail(),
    check("password", "Invalid credentials").not().isEmpty(),
    validate
], login);

routes.post("/google", [
    check("id_token", "Invalid token, token require").not().isEmpty(),
    validate
], signInWithGoogle);



module.exports = routes;