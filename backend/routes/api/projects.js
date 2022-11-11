const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Project, Article } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

//Get all projects excluding the homepage project
router.get(
    "/",
    asyncHandler(async (req, res) => {
        const projects = await Project.findAll({
            include: [
                {
                    model: Article,
                    as: "articles",
                },
            ],
        });

        return res.json({
            projects,
        });
    })
);

module.exports = router;
