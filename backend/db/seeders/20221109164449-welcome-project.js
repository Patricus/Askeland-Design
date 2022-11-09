"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Projects",
            [
                {
                    title: "Welcome",
                    date: Sequelize.fn("now"),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Projects", null, {});
    },
};
