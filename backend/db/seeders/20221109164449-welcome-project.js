"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Projects",
            [
                {
                    title: "Welcome",
                    date: new Date("2022 - 11 - 23"),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Projects", null, {});
    },
};
