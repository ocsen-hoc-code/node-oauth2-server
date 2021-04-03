'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OauthClients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OauthClients.init({
    Id: { type: DataTypes.UUID, primaryKey: true },
    ClientId: DataTypes.STRING,
    SecretKey: DataTypes.STRING,
    RedirectUris: DataTypes.STRING,
    Scope: DataTypes.STRING,
    Grants: DataTypes.STRING,
    AccessTokenLifetime: DataTypes.INTEGER,
    RefreshTokenLifetime: DataTypes.INTEGER,
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
    modelName: 'OauthClients',
    paranoid: true
  });
  return OauthClients;
};
