module.exports = function(sequelize, DataTypes) {
  var Neighbor = sequelize.define("Neighbor", {
    name: DataTypes.STRING
  });

  Neighbor.associate = function(models) {
    Neighbor.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Neighbor;
};