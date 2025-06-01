const { Router } = require("express");
const apiRoutes = require("./api.routes");
const router = Router();

// Base Routes
router.use("/api", apiRoutes);

// render routes

module.exports = router;