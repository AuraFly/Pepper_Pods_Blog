const User = require("./User");
const Entry = require("./Entry");
const Comment = require("./Comment");

User.hasMany(Entry, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Entry.belongsTo(User, {
  foreignKey: "userId",
});

Entry.hasMany(Comment, {
  foreignKey: "entryId",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = { User, Entry, Comment };
