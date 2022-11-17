"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Article extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Article.belongsTo(models.Project, {
                foreignKey: "projectId",
            });
        }
    }
    Article.init(
        {
            projectId: DataTypes.INTEGER,
            text: DataTypes.TEXT,
            imageLink: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Article",
        }
    );
    return Article;
};
