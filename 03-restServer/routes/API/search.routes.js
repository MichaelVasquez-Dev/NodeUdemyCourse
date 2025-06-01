const { Router } = require("express");
const { searchInDb } = require("../../controllers/search.controller");

const router = Router();

router.get("/:collection/:term", searchInDb)

module.exports = router;