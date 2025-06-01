const { Router } = require("express");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../../controllers/products.controller");
const { validateJWT } = require("../../middlewares/validateJWT.middleware");
const { check } = require("express-validator");
const { searchCategoryById, searchProductById } = require("../../helpers/db-validators");
const { validate } = require("../../middlewares/validate.middleware");

const router = Router();

router.get("/", [
    validateJWT,
    check("limit", "Limit must be a positive integer").optional().isInt({ min: 1 }),
    check("offset", "Offset must be a non-negative integer").optional().isInt({ min: 0 }),
    validate
], getAllProducts);

router.get("/:id", [
    validateJWT,
    check("id", "Invalid product ID").isMongoId().custom(searchProductById),
    validate
], getProductById);

router.post("/", [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("category", "Category ID is invalid").isMongoId().custom(searchCategoryById),
    check("price", "Price must be a positive number").isFloat({ min: 0 }),
    check("stock", "Stock must be a non-negative integer").optional().isInt({ min: 0 }),
    check("description", "Description is required").not().isEmpty(),
    validate
], createProduct);

router.put("/:id", [
    validateJWT,
    check("id", "Invalid product ID").isMongoId().custom(searchProductById),
    validate
], updateProduct);

router.delete("/:id", [
    validateJWT,
    check("id", "Invalid product ID").isMongoId().custom(searchProductById),
    validate
], deleteProduct);

module.exports = router;

