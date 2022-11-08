"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Users",
            [
                {
                    email: "Askeland.Eric@gmail.com",
                    name: "Eric Askeland",
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
                email: { [Op.in]: ["Askeland.Eric@gmail.com"] },
            },
            {}
        );
    },
};
