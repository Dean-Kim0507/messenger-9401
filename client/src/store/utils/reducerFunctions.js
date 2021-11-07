export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });

};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      //User's active conversation set "" when user logout
      if (convoCopy.otherUser.activeConvoId) convoCopy.otherUser.activeConvoId = ""
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const updateConvoReadInStore = (state, data) => {
  const numberOfUpdatedRows = data.numberOfUpdatedRows[0];

  if (numberOfUpdatedRows > 0) {
    return state.map((convo) => {
      if (convo.id === Number(data.convoId)) {
        const convoCopy = { ...convo };
        const newConvo = {
          id: convoCopy.id,
          latestMessageText: convoCopy.latestMessageText,
          otherUser: convoCopy.otherUser,
          //all read status reset true
          messages: convoCopy.messages.map(message => {
            if (!message.read) {
              const copyMessage = message;
              copyMessage.read = true;
              return copyMessage;
            } else return message;
          })
        }
        return newConvo;
      } else return convo;
    });
  } else {
    return state;
  };
}

export const setOtherUserActiveConvoToStore = (state, activeConvoId, userId) => {

  return state.map((convo) => {
    if (convo.otherUser.id === userId) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.activeConvoId = activeConvoId;
      //Messge unRead statuns change from other user
      convoCopy.messages = convoCopy.messages.map((message) => {
        message.read = true
        return message;
      })
      return convoCopy;
    } else return convo;
  })
}

export const countUnreadMsgs = (convo) => {
  return convo.messages.reduce((acc, cur) => {
    return (!cur.read && cur.senderId === convo.otherUser.id) ? ++acc : acc;
  }, 0);
}
