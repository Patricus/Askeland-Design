const router = require("express").Router();
const sessionRouter = require("./session.js");
const projectRouter = require("./projects.js");
const articleRouter = require("./articles.js");
const pictureRouter = require("./picture.js");

router.use("/session", sessionRouter);
router.use("/projects", projectRouter);
router.use("/articles", articleRouter);
router.use("/pictures", pictureRouter);

module.exports = router;
