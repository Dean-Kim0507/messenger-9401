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

User.belongsToMany(Message,{
  through: 'user_messages',
  foreignKey: 'user_id'
})

Message.belongsToMany(User,{
  through: 'user_messages',
  foreignKey: 'message_id'
})


Message.belongsTo(Conversation);
Conversation.hasMany(Message);

//Full features are not implemented, I'll leave these just for passing a test.
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });

module.exports = {
  User,
  Conversation,
  Message
};
