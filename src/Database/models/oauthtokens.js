'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OAuthTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OAuthTokens.init({
    Id: { type: DataTypes.UUID, primaryKey: true },
    AccessToken: DataTypes.STRING,
    AccessTokenExpiresAt: DataTypes.DATE,
    RefreshToken: DataTypes.STRING,
    RefreshTokenExpiresAt: DataTypes.DATE,
    UserId: DataTypes.UUID,
    ClientId: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'OAuthTokens',
    paranoid: true
  });
  return OAuthTokens;
};
