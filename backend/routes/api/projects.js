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

//Add a project
router.post(
    "/",
    asyncHandler(async (req, res) => {
        const { title, date } = req.body;

        const project = await Project.create({
            title,
            date,
        });

        return res.json(project);
    })
);

//Update a project
router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const { title, date } = req.body;

        const project = await Project.findOne({
            where: {
                id,
            },
        });

        if (project) {
            project.title = title;
            project.date = date;

            return res.json(project);
        }
    })
);

//Delete a project
router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const id = req.params.id;

        Project.destroy({
            where: {
                id,
            },
        });

        return res.status(200);
    })
);

module.exports = router;
