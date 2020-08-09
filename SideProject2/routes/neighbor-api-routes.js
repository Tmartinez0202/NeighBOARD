var db = require("../models");

module.exports = function(app) {
  app.get("/api/neighbors", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Neighbor.findAll({
      include: [db.Post]
    }).then(function(dbNeighbor) {
      res.json(dbNeighbor);
    });
  });

  app.get("/api/neighbor/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Neighbor.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbNeighbor) {
      res.json(dbNeighbor);
    });
  });

  app.post("/api/neighbors", function(req, res) {
    db.Neighbor.create(req.body).then(function(dbNeighbor) {
      res.json(dbNeighbor);
    });
  });

  app.delete("/api/neighbors/:id", function(req, res) {
    db.Neighbor.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbNeighbor) {
      res.json(dbNeighbor);
    });
  });

};
