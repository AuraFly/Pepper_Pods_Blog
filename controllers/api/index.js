const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const cardRoutes = require("./cardRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/cards", cardRoutes);

module.exports = router;
