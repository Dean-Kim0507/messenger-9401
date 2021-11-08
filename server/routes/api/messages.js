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
    const { recipientId, text, conversationId, sender, otherUserActiveConvo } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const read = otherUserActiveConvo === conversationId ? true : false
      const message = await Message.create({ senderId, text, conversationId, read });
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

    //Early return if a user is not a part of the conversation
    const {dataValues} = await Conversation.findOne({where:{id:convoId}});
    if(dataValues.user1Id !== userId && dataValues.user2Id!==userId){
      return res.sendStatus(403);
    }

    const numberOfUpdatedRows = await Message.update({
      read: true
    }, {
      where: {
        [Op.and]:
          { conversationId: convoId, senderId: senderId, read: false }
      }, order: ["createdAt", "ASC"],
    }
    ).catch(error => {
      throw error;
    })

    return res.json({ numberOfUpdatedRows, convoId });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
