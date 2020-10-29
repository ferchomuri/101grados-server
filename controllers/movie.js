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
  if (!req.body.duration) {
    res.status(400).send({
      message: "El contenido no puede ser vacio",
    });
    return;
  }
  const {name, duration, genre, synopsis, idActor, nameActor} = req.body;

  try {
    const movie = await Movie.create({
        name: name,
        duration: duration,
        genre: genre,
        synopsis: synopsis,
        casting: casting
      },{
        include: [casting]
      }
      );
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


const findAll = async (req, res) => {
  Movie.findAll({
    include: {
      model: Actor,
      as: "elenco",
      attributes: ['name']
    }
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

module.exports = {create, findAll, findOne, update};

