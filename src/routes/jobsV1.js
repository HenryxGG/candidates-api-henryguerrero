const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs");

router.get("/", jobController.getAll);
router.get("/:id", jobController.getById);
router.post("/", jobController.create);
router.put("/:id", jobController.update);
router.delete("/:id", jobController.remove);

module.exports = router;