const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFile, uploadFileToCollection, showImage, uploadFileToCollectionWithCloudinary } = require("../../controllers/upload.controller");
const { validate } = require("../../middlewares/validate.middleware");
const { collecttionPermitted } = require("../../helpers/db-validators");

const router = Router();

router.get("/:collection/:id", [
    check("collection").notEmpty().withMessage("Collection name is required"),
    check("collection").custom( c => collecttionPermitted(c, ['users', 'products', 'orders']) ),
    // check("collection").isIn(['users', 'products', 'orders']).withMessage("Collection is not valid"),
    check("id").notEmpty().withMessage("ID is required"),
    check("id").isMongoId().withMessage("Id is not a valid"),
    validate
], showImage);

router.post("/", uploadFile);

router.put("/:collection/:id", [
    check("collection").notEmpty().withMessage("Collection name is required"),
    check("collection").custom( c => collecttionPermitted(c, ['users', 'products', 'orders']) ),
    // check("collection").isIn(['users', 'products', 'orders']).withMessage("Collection is not valid"),
    check("id").notEmpty().withMessage("ID is required"),
    check("id").isMongoId().withMessage("Id is not a valid"),
    validate
], uploadFileToCollection);

router.put("/cloudinary/:collection/:id", [
    check("collection").notEmpty().withMessage("Collection name is required"),
    check("collection").custom( c => collecttionPermitted(c, ['users', 'products', 'orders']) ),
    // check("collection").isIn(['users', 'products', 'orders']).withMessage("Collection is not valid"),
    check("id").notEmpty().withMessage("ID is required"),
    check("id").isMongoId().withMessage("Id is not a valid"),
    validate
], uploadFileToCollectionWithCloudinary);

module.exports = router;