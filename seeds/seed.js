const sequelize = require("../config/connection");
const { User, Comments, Cards } = require("../models");

const userData = require("./userSeeds.json");
const commentsData = require("./commentSeeds.json");
const cardData = require("./cardSeeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const User = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const Comments = await Comments.bulkCreate(commentsData, {
    returning: true,
  });

  const Cards = await Cards.bulkCreate(cardData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
