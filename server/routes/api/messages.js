const router = require("express").Router();
const { Conversation, Message, User } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const user = await User.findByPk(recipientId)
      // If user is in the conversation, unread status will be false, but in the other conversation, it will be true;
      const unRead = Number(user.dataValues.activeConvoId) === conversationId ? false : true;
      const message = await Message.create({ senderId, text, conversationId, unRead });
      return res.json({ message, sender });

    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/:convoId/:senderId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const senderId = req.params.senderId;
    const convoId = req.params.convoId;

    //Reset active conversation of user
    const numberOfUpdatedUser = await User.update(
      { activeConvoId: convoId },
      { where: { id: userId } }
    ).catch(error => {
      throw error;
    })

    //To make sure user active conversations was udpated
    if (numberOfUpdatedUser[0] > 0) {
      const data = await Message.update({
        unRead: false
      }, {
        where: {
          [Op.and]:
            { conversationId: convoId, senderId: senderId, unRead: true }
        }, order: ["createdAt", "ASC"],
        returning: true
      }
      ).catch(error => {
        throw error;
      })
      return res.json(data);
    }
    throw error(error)
  } catch (error) {
    next(error);
  }
});
module.exports = router;
