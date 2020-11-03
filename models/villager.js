module.exports = function(sequelize, DataTypes){

    var Villager = sequelize.define("Villager",{
        name: DataTypes.STRING,
        dreamy: DataTypes.BOOLEAN
    })
   
    return Villager;

}