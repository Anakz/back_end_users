'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.adresses.belongsTo(models.users, {
        foreignKey: {
          allowNull : false
        }
      })

    }
  };
  adresses.init({
    userId: DataTypes.INTEGER,
    home_adress1: DataTypes.STRING,
    home_adress2: DataTypes.STRING,
    work_adress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'adresses',
  });
  return adresses;
};