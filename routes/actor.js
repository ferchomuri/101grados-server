var express = require('express');
var router = express.Router();
var actor = require('../controllers/actor');

router.post("/", actor.create);
router.get("/", actor.findAll);
router.get("/:id", actor.findOne);
router.put("/:id", actor.update);

module.exports = router;