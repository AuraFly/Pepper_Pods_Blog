const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const entryRoutes = require("./entryRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/entries", entryRoutes);

module.exports = router;
