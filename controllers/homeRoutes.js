const router = require("express").Router();
const { User, Entry, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const entryData = await Entry.findAll({
      include: [
        {
          model: User,
          foreignKey: "userId",
        },
      ],
    });
    const entries = entryData.map((entry) => entry.get({ plain: true }));
    res.render("homepage", {
      entries,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/entry/:id", async (req, res) => {
  try {
    const entryData = await Entry.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    const entry = entryData.get({ plain: true });
    res.render("entry", {
      ...entry,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/account", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Entry }],
    });
    const user = userData.get({ plain: true });
    res.render("account", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/account");
    return;
  }
  res.render("login");
});

router.get("/update/:id", withAuth, async (req, res) => {
  try {
    const entryData = await Entry.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const entry = entryData.get({ plain: true });
    res.render("update", {
      ...entry,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
