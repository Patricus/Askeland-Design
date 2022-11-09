const router = require("express").Router();
const sessionRouter = require("./session.js");
const projectRouter = require("./projects.js");

router.use("/session", sessionRouter);
router.use("/projects", projectRouter);

module.exports = router;
