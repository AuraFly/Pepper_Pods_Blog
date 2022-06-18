const User = require("./User");
const Comments = require("./Comments");
const Cards = require("./Cards");

User.hasMany(Comments, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comments.belongsTo(User, {
  foreignKey: "userId",
});

Cards.belongsTo(User, {
  foreignKey: "userId",
});

Cards.hasMany(Comments, {
  foreignKey: "cardId",
  onDelete: "CASCADE",
});

module.exports = { User, Comments, Cards };
