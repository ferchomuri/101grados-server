const db = require("../models");
const Actor = db.actor;
const Op = db.Sequelize.Op;
require("../models/asociations");

exports.create = (req, res) =>{
    if (!req.body.title) {
        res.status(400).send({
            message: "The conten wasnt be empty"
        });
        return;
    };

    const actor = {
        name: req.body.name,
        age: req.body.age,
        photo: req.body.photo
    };

    Actor.create(actor)
    .then(data => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Actor" 
        });
    });
};

exports.findAll = (req, res) => {
    Actor.findAll({}).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Actor."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Actor.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Actor with id=" + id
        });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Actor.update(req.body, {
      where : {id: id}
  }).then(num => {
      if (num == 1){
          res.send({
            message: "Actor was updated successfully."
        });
      }else {
          res.send({
            message: `Cannot update actor with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
      };
  })
  .catch(err => {
      res.status(500).send({
        message: "Error updating Actor with id=" + id
      });
  });
};

exports.delete = (req, res) => {
  
};