const { Router } = require("express");
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = require("../../controllers/users.controller");
const { check } = require("express-validator");
const { validate } = require("../../middlewares/validate.middleware");
const { RoleIsValid, emailExists, searchUserById } = require("../../helpers/db-validators");
const { validateJWT } = require("../../middlewares/validateJWT.middleware");
const { isAdminRole, isPermittedRole } = require("../../middlewares/validarRoles.middleware");

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.post("/", [
    check("email", "Email is required").isEmail(),
    check("email").custom(emailExists),
    check("name", "Name is required").notEmpty(),
    check("password", "Password is required y necesitas 6 digitos").isLength({ min: 6 }).notEmpty(),
    // check("role", "Role is required").isIn(["ADMIN_ROLE","USER_ROLE"]).notEmpty(),
    check("role").custom(RoleIsValid),
    validate

], createUser);

router.put("/:id", [
    validateJWT,
    check("id", "Not a valid MongoDB ID").isMongoId(),
    check("id").custom(searchUserById),
    check("role").custom(RoleIsValid),
    validate,
], updateUser);

router.delete("/:id", [
    validateJWT,
    // isAdminRole,
    isPermittedRole(["ADMIN_ROLE", "VENTAS_ROLE"]),
    check("id", "Not a valid MongoDB ID").isMongoId(),
    check("id").custom(searchUserById),
    validate
], deleteUser);

module.exports = router;