module.exports = app => {
    const movies = require("../controllers/movie");

    var router = require("express").Router();

    router.post("/", movies.create);

    router.get("/", movies.findAll);

    router.get("/:id", movies.findOne);

    router.put("/:id", movies.update);

    app.use('/movies', router);
}