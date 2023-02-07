const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Picture } = require("../../db/models");

const router = express.Router();

//Add a picture
router.post(
    "/",
    requireAuth,
    asyncHandler(async (req, res) => {
        const { projectId, imageLink } = req.body;

        const picture = await Picture.create({
            projectId,
            imageLink,
        });

        return res.json(picture);
    })
);

//Update a picture
router.put(
    "/:id",
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const { imageLink } = req.body;

        const picture = await Picture.findOne({
            where: {
                id,
            },
        });

        if (picture)
            await picture.update({
                imageLink,
            });

        return res.json(picture);
    })
);

//Delete a picture
router.delete(
    "/:id",
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = req.params.id;

        const picture = await Picture.findByPk(id);

        await picture.destroy();
        return res.json(picture);
    })
);

module.exports = router;
