"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Welcome extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Welcome.init(
        {
            title: DataTypes.STRING(60),
        },
        {
            sequelize,
            modelName: "Welcome",
        }
    );
    return Welcome;
};