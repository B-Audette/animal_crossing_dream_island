module.exports = function(sequelize, DataTypes){

    var Villager = sequelize.define("Villager",{
        name: DataTypes.STRING,
        // user: DataTypes.STRING,
        dreamy: DataTypes.BOOLEAN
    })
   
    return Villager;
};
