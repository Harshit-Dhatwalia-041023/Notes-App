const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesControllers")
const wrapAsync = require("../middleware/wrapasync");
router.route("/")
.get(wrapAsync(notesController.getNotes))
.post(wrapAsync(notesController.create))
router.route("/:id")
.get(wrapAsync(notesController.getNote))
.put(wrapAsync(notesController.update))
.delete(wrapAsync(notesController.delete))

module.exports = router;