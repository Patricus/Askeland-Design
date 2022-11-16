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
        const { projectId, text, image_link } = req.body;

        const article = await Article.create({
            projectId,
            text,
            image_link,
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
        const { text, image_link } = req.body;

        const article = await Article.findOne({
            where: {
                id,
            },
        });

        await article.update({
            text,
            image_link,
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

        Article.destroy({
            where: {
                id,
            },
        });

        return res.status(200);
    })
);

module.exports = router;
