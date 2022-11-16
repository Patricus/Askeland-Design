const router = require("express").Router();
const sessionRouter = require("./session.js");
const projectRouter = require("./projects.js");
const articleRouter = require("./articles.js");

router.use("/session", sessionRouter);
router.use("/projects", projectRouter);
router.use("/articles", articleRouter);

module.exports = router;
