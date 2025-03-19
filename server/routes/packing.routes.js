const { Router } = require("express");
const router = Router();
const packingController = require('../controllers/packing.controller');

router.get("/:itineraryId", packingController.getAllItems);
router.post("/", packingController.addItem);
router.put("/:id", packingController.updateItem);
router.delete("/:id", packingController.deleteItem);

module.exports = router;