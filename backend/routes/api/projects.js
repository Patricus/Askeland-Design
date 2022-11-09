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
            where: {
                id: {
                    [Op.not]: [1],
                },
            },
        });

        return res.json({
            projects,
        });
    })
);

//Get specific project and it's articles
router.get(
    "/:projectId",
    asyncHandler(async (req, res, next) => {
        const id = req.params.projectId;

        const project = await Project.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: Article,
                },
            ],
        });

        if (!project) {
            const err = new Error("Project not found");
            err.status = 401;
            err.title = "Project not found";
            err.errors = ["The requested project doesn't exist."];
            return next(err);
        }

        return res.json({
            project,
        });
    })
);
module.exports = router;
