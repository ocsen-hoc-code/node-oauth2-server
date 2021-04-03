'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OauthorizationCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OauthorizationCodes.init({
    Id: { type: DataTypes.UUID, primaryKey: true },
    Code: DataTypes.STRING,
    ExpiresAt: DataTypes.DATE,
    RedirectUri: DataTypes.STRING,
    Scope: DataTypes.STRING,
    UserId: DataTypes.STRING,
    ClientId: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'OauthorizationCodes',
  });
  return OauthorizationCodes;
};