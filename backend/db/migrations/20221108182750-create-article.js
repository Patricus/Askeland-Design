"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Articles", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            projectId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "Projects",
                    key: "id",
                },
            },
            text: {
                type: Sequelize.TEXT,
            },
            imageLink: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("now"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("now"),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Articles");
    },
};
