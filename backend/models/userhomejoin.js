"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserHomeJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserHomeJoin.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: "id",
        },
      },
      home_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Home',
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "UserHomeJoin",
      tableName: "user_home_join",
      timestamps: false,
    }
  );

  return UserHomeJoin;
};
