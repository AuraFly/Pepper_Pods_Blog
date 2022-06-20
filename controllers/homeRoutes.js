const router = require("express").Router();
const { User, Entry, Comment } = require("../models");
const withAuth = require("../utils/auth");

//gets entry data and joins with user data to be utilized on the homepage.handlebars.
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

//gets entry data and joins with user data to be utilized on entry.handlebars
router.get("/entry/:id", async (req, res) => {
  try {
    const entryData = await Entry.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name", "userImage"],
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

//gets user data minus password and joins with entry data to be utilized on the entry.handlebars.
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

//prevents a logged in user from seeing the login page again, redirects them to account
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/account");
    return;
  }
  res.render("login");
});

//gets entry data and joins with user data and comment data to be utilized on the update.handlebars.
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
