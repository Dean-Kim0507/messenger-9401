import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((NumOfUnRead) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unReadMsgs: {
    marginRight: "50px"
  }
}));

const ChatContent = (props) => {
  const { conversation, NumOfUnRead } = props;
  const { latestMessageText, otherUser } = conversation;
  const classes = useStyles(NumOfUnRead);
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={classes.previewText}
          style={{
            color: NumOfUnRead > 0 ? "black" : "#9CADC8",
            fontWeight: NumOfUnRead > 0 ? "bold" : "normal",
          }}

        >
          {latestMessageText}
        </Typography>
      </Box>
      <Box>
        {NumOfUnRead > 0 &&
          <Badge badgeContent={NumOfUnRead}
            className={classes.unReadMsgs}
            color="primary" />
        }
      </Box>
    </Box>
  );
};

export default ChatContent;