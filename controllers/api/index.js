const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const entryRoutes = require("./entryRoutes");
const accountRoutes = require("./accountRoutes");

//defines routes/files to use for different api calls
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/entries", entryRoutes);
router.use("/account", accountRoutes);

module.exports = router;
