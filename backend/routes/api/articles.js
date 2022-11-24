const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Project, Article } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

//Add a article
router.post(
    "/",
    requireAuth,
    asyncHandler(async (req, res) => {
        const { projectId, text } = req.body;

        const article = await Article.create({
            projectId,
            text,
        });

        return res.json(article);
    })
);

//Update a article
router.put(
    "/:id",
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const { text } = req.body;

        const article = await Article.findOne({
            where: {
                id,
            },
        });

        if (article)
            await article.update({
                text,
            });

        return res.json(article);
    })
);

//Delete a article
router.delete(
    "/:id",
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = req.params.id;

        const article = await Article.findByPk(id);

        await article.destroy();
        return res.json(article);
    })
);

module.exports = router;
