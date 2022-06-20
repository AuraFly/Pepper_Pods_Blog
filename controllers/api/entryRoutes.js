const router = require("express").Router();
const { Entry } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const entryData = await Entry.findAll({
      order: [["dateCreated", "DESC"]],
    });
    res.status(200).json(entryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newEntry = await Entry.create({
      ...req.body,
      userId: req.session.user_id,
    });
    res.status(200).json(newEntry);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const entryData = await Entry.update(
      {
        entry: req.body.entry,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!entryData) {
      res.status(404).json({ message: "No entry found, sorry!" });
      return;
    }
    res.status(200).json(entryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const entryData = await Entry.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!entryData) {
      res.status(404).json({ message: "No entry found, sorry" });
      return;
    }

    res.status(200).json(entryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;