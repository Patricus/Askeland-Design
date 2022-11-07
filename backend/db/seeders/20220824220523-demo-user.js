"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Users",
            [
                {
                    email: "Askeland.Eric@gmail.com",
                    username: "Eric Askeland",
                    hashedPassword: bcrypt.hashSync("password"),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(
            "Users",
            {
                username: { [Op.in]: ["Eric Askeland"] },
            },
            {}
        );
    },
};
