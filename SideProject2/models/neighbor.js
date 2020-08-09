module.exports = function(sequelize, DataTypes) {
  var Neighbor = sequelize.define("Neighbor", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  Neighbor.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Neighbor.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Neighbor;
};