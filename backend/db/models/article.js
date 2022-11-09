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
                foreignKey: "project_id",
            });
        }
    }
    Article.init(
        {
            project_id: DataTypes.INTEGER,
            text: DataTypes.TEXT,
            image_link: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Article",
        }
    );
    return Article;
};
