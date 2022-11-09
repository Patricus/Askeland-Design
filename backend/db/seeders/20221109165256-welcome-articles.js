"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Articles",
            [
                {
                    project_id: 1,
                    text: "Hello and welcome to Askeland Design.",
                    image_link: "",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Articles", null, {});
    },
};
