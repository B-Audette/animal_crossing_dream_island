module.exports = function(sequelize, DataTypes){

    var Villager = sequelize.define("Villager",{
        name: DataTypes.STRING,
        dreamy: DataTypes.BOOLEAN,
        
    })
    
  Villager.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Villager.belongsTo(models.User, {
      foreignKey: {
        allowNull: false

      }
    });
  };
   
    return Villager;
};
