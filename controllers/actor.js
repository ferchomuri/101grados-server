const models = require("../models");
const Actor = models.actor;

const create = async (req, res) =>{
    if (!req.body.name) {
        res.status(400).send({
            message: "The conten wasnt be empty"
        });
        return;
    };
    const {name, age, photo} = req.body;
    try {
        const actor = await Actor.create({
            name: name,
            age, age,
            photo: photo
        });
        return res.status(200).json(Actor);
    } catch (error) {
        console.log(error);
        return res.status(505).json({ msg: "Sorry, an error ocurred." });
        };
    };

const findAll = async (req, res) => {
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

const findOne = async (req, res) => {
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

const update = async (req, res) => {
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

module.exports = { create, findAll, findOne, update };