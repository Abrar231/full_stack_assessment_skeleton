"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Home extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Home.init(
    {
      street_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sqft: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
      beds: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      baths: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      list_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Home",
      tableName: "home",
      timestamps: false,
    }
  );

  Home.associate = (models) => {
    Home.belongsToMany(models.User, {
      through: models.UserHomeJoin,
      foreignKey: 'home_id'
    });
  }

  return Home;
};
