const { Router } = require("express");
const { check } = require("express-validator");
const { validate } = require("../../middlewares/validate.middleware");
const { allCategories, categoryById, createCategory, updateCategory, deleteCategory } = require("../../controllers/categories.controller");
const { isPermittedRole } = require("../../middlewares/validarRoles.middleware");
const { validateJWT } = require("../../middlewares/validateJWT.middleware");
const { searchUserById, searchCategoryById } = require("../../helpers/db-validators");


const router = Router();

router.get("/", [
    validateJWT,
    isPermittedRole(["PUBLIC"])
], allCategories);

router.get("/:id", [
    validateJWT,
    isPermittedRole(["PUBLIC"]),
    check("id", "The ID is not valid").isMongoId().custom(searchCategoryById),
    validate
], categoryById);

router.post("/", [
    validateJWT,
    isPermittedRole(["PUBLIC"]),
    check("name", "The name is required").not().isEmpty(),
    check("name", "The name must be at least 3 characters").isLength({ min: 3 }),
    check("user", "The user id is required").isMongoId(),
    check("user").custom(searchUserById),
    validate
], createCategory);

router.put("/:id", [
    validateJWT,
    isPermittedRole(["ADMIN_ROLE"]),
    check("id", "The ID is not valid").isMongoId().custom(searchCategoryById),
    validate
], updateCategory);

router.delete("/:id", [
    validateJWT,
    isPermittedRole(["ADMIN_ROLE"]),
    check("id", "The ID is not valid").isMongoId().custom(searchCategoryById),
    validate
], deleteCategory);


module.exports = router;