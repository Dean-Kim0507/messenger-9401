const Sequelize = require("sequelize");
const db = require("../db");
const Message = require("./message");

const User_Messages = db.define("user_messages", {
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});
