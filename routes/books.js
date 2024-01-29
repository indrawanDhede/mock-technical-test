const express = require("express");
const router = express.Router();

const BookController = require("../controllers/BookController");

router.get("/", BookController.index);
router.get("/:id", BookController.show);
router.get("/jenis/:jenis", BookController.showJenis);
router.put("/:id", BookController.update);
router.post("/", BookController.create);
router.delete("/:id", BookController.destroy);

module.exports = router;
