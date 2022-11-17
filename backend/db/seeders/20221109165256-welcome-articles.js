"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Articles",
            [
                {
                    projectId: 1,
                    text: "Hello and welcome to Askeland Design.",
                    imageLink: "",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Articles", null, {});
    },
};
