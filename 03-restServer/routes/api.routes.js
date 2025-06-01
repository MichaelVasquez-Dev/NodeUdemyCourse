const { Router } = require("express");
const usersRoutes = require("./API/users.routes");
const categoriesRoutes = require("./API/categories.routes");
const productsRoutes = require("./API/products.routes");
const searchRoutes = require("./API/search.routes");
const uploadRoutes = require("./API/upload.routes");

const router = Router();

router.use("/auth", require("./API/auth.routes"));
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/search", searchRoutes);
router.use("/upload", uploadRoutes);

module.exports = router;