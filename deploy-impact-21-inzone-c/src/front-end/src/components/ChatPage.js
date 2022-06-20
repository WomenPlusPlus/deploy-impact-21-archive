import React, {useState} from "react";
import {
  Typography,
  ListItem,
  ListItemAvatar,
  Divider,
  Avatar,
  ListItemText,
  List,
  Grid,
  Paper,
  CssBaseline,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MessageLeft, MessageRight } from "./Messenger/Message";
import { TextInput } from "./Messenger/TextInput";

const ChatPage = () => {
  const [leftMessages, setLeftMessages] = useState([])
  const [rightMessages, setRightMessages] = useState([])
  const addMessage = (message) => {
    console.log('message: ', message)
  }
  const renderRow = () => {
    return (
      <>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
  };
  return (
    <div>
      <CssBaseline />
      <Grid
        sx={{
          height: "83vh",
        }}
        container
        spacing={2}
      >
        <Grid item xs={4}>
          <Item>
            <List sx={styles.listBox}>{renderRow()}</List>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <div style={styles.chatBoxDiv}>
              <Paper style={styles.chatBoxPaper} zDepth={2}>
                <Paper id="style-1" style={styles.chatBoxInsidePaper}>
                  <MessageLeft
                    message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt lacus in efficitur convallis. Nullam ante dolor, eleifend tincidunt efficitur eget, fermentum et augue"
                    timestamp="11/22 05:35"
                    displayName="Coordinator Emrecan"
                  />
                  <MessageRight
                    message="Nunc blandit interdum fringilla. Sed quis lectus a diam interdum aliquet in quis ligula. Curabitur ullamcorper dictum magna, a vulputate sem sagittis at."
                    timestamp="11/22 06:00"
                    displayName="Zakia"
                  />
                  <MessageLeft
                    message="Morbi justo risus, laoreet non mauris in, euismod dictum neque. Aliquam mattis nisi quis sollicitudin gravida. In sit amet purus vel leo tempus tincidunt."
                    timestamp="11/22 07:35"
                    displayName="Coordinator Emrecan"
                  />
                  <MessageRight
                    message="Vestibulum vitae diam augue."
                    timestamp="11/22 08:35"
                    displayName="Zakia"
                  />
                  <MessageLeft
                    message="Morbi justo risus, laoreet non mauris in, euismod dictum neque. Aliquam mattis nisi quis sollicitudin gravida. In sit amet purus vel leo tempus tincidunt."
                    timestamp="11/22 09:35"
                    displayName="Coordinator Emrecan"
                  />
                  <MessageRight
                    message="Vestibulum vitae diam augue."
                    timestamp="11/22 10:35"
                    displayName="Zakia"
                  />
                  <MessageLeft
                    message="Morbi justo risus, laoreet non mauris in, euismod dictum neque. Aliquam mattis nisi quis sollicitudin gravida. In sit amet purus vel leo tempus tincidunt."
                    timestamp="11/22 11:35"
                    displayName="Coordinator Emrecan"
                  />
                  <MessageRight
                    message="Vestibulum vitae diam augue."
                    timestamp="11/22 12:35"
                    displayName="Zakia"
                  />
                </Paper>
                <TextInput sendClicked={(clicked, message) => clicked && addMessage(message)} />
              </Paper>
            </div>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  backgroundColor: "#2B2E39",
  color: theme.palette.text.primary,
}));
const styles = {
  listBox: {
    width: "100%",
    maxWidth: 360,
  },
  chatBoxDiv: {
    // width: "100vw",
    // height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  chatBoxPaper: {
    width: "80vw",
    height: "70vh",
    backgroundColor: "#20222B",
    borderColor: "#E3E4E5",
    borderWidth: 1,
    borderStyle: "solid",
    maxWidth: "75%",
    maxHeight: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  chatBoxInsidePaper: {
    width: "calc( 100% - 20px )",
    margin: 10,
    overflowY: "scroll",
    height: "calc( 100% - 80px )",
  },
};
export default ChatPage;
