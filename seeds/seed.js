const sequelize = require("../config/connection");
const { User, Comment, Entry } = require("../models");

const userData = require("./userSeeds.json");
const entryData = require("./entrySeeds.json");
const commentData = require("./commentSeeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const entries = await Entry.bulkCreate(entryData, {
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
