import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { readMessages } from "../../store/utils/thunkCreators"
import { countUnreadMsgs } from "../../store/utils/reducerFunctions"
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, readMessages, userId } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await readMessages({
      convoId: conversation.id,
      senderId: conversation.otherUser.id,
      userId: userId,
    });
    await props.setActiveChat(conversation.otherUser.id);
  };

  const NumOfUnRead = countUnreadMsgs(conversation);

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} NumOfUnRead={NumOfUnRead} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    readMessages: (body) => {
      dispatch(readMessages(body))
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
