const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.belongsToMany(Conversation,{
  through: 'user_conversations',
  foreignKey: 'user_id'
})

Conversation.belongsToMany(User,{
  through: 'user_conversations',
  foreignKey: 'convo_id'
})

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
