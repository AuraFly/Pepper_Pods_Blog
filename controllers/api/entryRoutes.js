const router = require("express").Router();
const { Entry } = require("../../models");
const withAuth = require("../../utils/auth");

//get route that allows the entry handlebars to use this data, and sorts it into a descending format.
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

//route that listesns for a new entry and creates it based off form data and user_id
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

//route updates entry from update.handlebars as long as uid matches.
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

//delete route that will delete an entry as long as an id is specified, this is handled on account.handlebars.
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
