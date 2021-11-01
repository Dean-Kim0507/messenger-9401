import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  // let { user } = props;
  // let conversation = props.conversation || {};

  //Useselector more efficent than passing value through pros: 
  //Home component doesn't need to be called to get updated conversations
  const state = useSelector(state => state);
  let conversation;
  if (state.conversations) {
    conversation = state.conversations.find(
      (conversation) => conversation.otherUser.username === state.activeConversation
    ) || {};
  }
  const user = state.user;

  return (
    <Box className={classes.root}>
      {conversation && conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     conversation:
//       state.conversations &&
//       state.conversations.find(
//         (conversation) => conversation.otherUser.username === state.activeConversation
//       )
//   };
// };

export default ActiveChat;
// export default connect(mapStateToProps, null)(ActiveChat);
