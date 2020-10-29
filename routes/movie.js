var express = require('express');
var router = express.Router();
var movie = require('../controllers/movie');

router.post("/", movie.create);
router.get("/", movie.findAll);
router.get("/:id", movie.findOne);
router.put("/:id", movie.update);

module.exports = router;