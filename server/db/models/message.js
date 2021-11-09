const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  //Full features are not implemented, I'll leave read attribute just for passing a test.
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Message;
