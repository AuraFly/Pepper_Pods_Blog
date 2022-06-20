const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//get route that allows comment data to be used via handlebars
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post route that is listening for userid, entryid, and comment values from the comments.js function
router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      userId: req.session.user_id,
      entryId: req.body.entryId,
      comment: req.body.formInfo,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete route that is listening for values from the comments.js function
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({
        message: "These arent the comments you are looking for, move along.",
      });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
