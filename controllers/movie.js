const db = require("../models");
const actor = require("../models/actor");
const Movie = db.movie;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "El contenido no puede ser vacio",
    });
    return;
  }
  const {name, duration, genre, synopsis} = req.body;

  try {
    const movie = await Movie.create({
        name: name,
        duration: duration,
        genre: genre,
        synopsis: synopsis,
      });
      return res.status(200).json(Movie);
  } catch (error) {
    console.log(error);
    return res.status(505).json({ msg: "Sorry, an error ocurred." });
    };
  };

  /*const actors = req.body.actors;
    if(req.body.actors){
        actors.forEach(element => {
            movie1.addActor(element);    
        });
        
    }*/


exports.findAll = (req, res) => {
  Movie.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Movies.",
      });
    });
};

exports.findOne = (req, res) => {
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

exports.update = (req, res) => {
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

exports.delete = (req, res) => {};

