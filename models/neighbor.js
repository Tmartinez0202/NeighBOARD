module.exports = function(sequelize, DataTypes) {
  var Neighbor = sequelize.define("Neighbor", {
    name:{
          type:DataTypes.STRING,
          allowNull: false,
          validate:{
            len: [1, 30]
          }
    },
    pets:{
      type: DataTypes.INTEGER,
      allowNull: true
    }, 
    kids:{
      type:DataTypes.INTEGER,
      allowNull: true

    },
    cars:{
          type: DataTypes.INTEGER,
          max: 4
    }
  });

  Neighbor.associate = function(models) {
    Neighbor.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };


  return Neighbor;
  
};