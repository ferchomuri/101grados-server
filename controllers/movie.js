const models = require("../models");
const Movie = models.movie;
const Actor = models.actor;

const create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "El contenido no puede ser vacio",
    });
    return;
  }
  const { name, duration, genre, synopsis, actorId } = req.body;

  try {
    const movie = await Movie.create(
      {
        name: name,
        duration: duration,
        genre: genre,
        synopsis: synopsis
      },
      /*{
        include: [casting],
      }*/
    );
    //addActor(actorId, movie.id);
    return res.status(200).json(Movie);

  } catch (error) {
    console.log(error);
    return res.status(505).json({ msg: "Sorry, an error ocurred." });
  }
};

const findAll = async (req, res) => {
  Movie.findAll({
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Movies.",
      });
    });
};

const findOne = async (req, res) => {
  const id = req.params.id;

  Movie.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving movie with id=" + id,
      });
    });
};

const update = async (req, res) => {
  const id = req.params.id;

  Movie.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Movie was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update movie with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Movie with id=" + id,
      });
    });
};

async function addActor (actorId, movieId) {
  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      console.log("Movie not found");
      return null;
    }
    const actor = await Actor.findByPk(actorId);
    if (!actor) {
      console.log("Movie not found");
      return null;
    }
    movie.addActor(actor);
    console.log(`actor id ${actor.id} - movie id ${movie.id}`);
    return movie;
  } catch (error) {
    console.log(">> Error while adding Tutorial to Tag: ", error);
  }
};

module.exports = { create, findAll, findOne, update };
