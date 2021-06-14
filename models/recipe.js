'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.recipe.belongsTo(models.user)
    }
  };
  recipe.init({
    idMeal: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    video: DataTypes.STRING,
    source: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};