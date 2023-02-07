"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Project.hasMany(models.Article, {
                as: "articles",
                foreignKey: "projectId",
                onDelete: "cascade",
                hooks: true,
            });
            Project.hasMany(models.Picture, {
                as: "articles",
                foreignKey: "projectId",
                onDelete: "cascade",
                hooks: true,
            });
        }
    }
    Project.init(
        {
            title: DataTypes.STRING(60),
            date: DataTypes.DATEONLY,
        },
        {
            sequelize,
            modelName: "Project",
        }
    );
    return Project;
};
