"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [2, 30],
                    isNotEmail(value) {
                        if (Validator.isEmail(value)) {
                            throw new Error("Cannot be an email.");
                        }
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [3, 256],
                },
            },
            hashedPassword: {
                type: DataTypes.STRING.BINARY,
                allowNull: false,
                validate: {
                    len: [60, 60],
                },
            },
        },
        {
            defaultScope: {
                attributes: {
                    exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
                },
            },
            scopes: {
                currentUser: {
                    attributes: { exclude: ["hashedPassword"] },
                },
                loginUser: {
                    attributes: {},
                },
            },
        }
    );

    User.prototype.toSafeObject = function () {
        // remember, this cannot be an arrow function
        const { id, name, email } = this; // context will be the User instance
        return { id, name, email };
    };

    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    User.getCurrentUserById = async function (id) {
        return await User.scope("currentUser").findByPk(id);
    };

    User.associate = function (models) {
        // associations can be defined here
    };

    User.login = async function ({ email, password }) {
        const user = await User.scope("loginUser").findOne({
            where: {
                email,
            },
        });
        if (user && user.validatePassword(password)) {
            return await User.scope("currentUser").findByPk(user.id);
        }
    };

    User.signup = async function ({ name, email, password }) {
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({
            name,
            email,
            hashedPassword,
        });
        return await User.scope("currentUser").findByPk(user.id);
    };

    return User;
};
