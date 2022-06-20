import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  LinearProgress,
  Grid,
  Paper,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Button,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  MoreHoriz,
  ExpandLess,
  ExpandMore,
  Sort,
  Search,
  NotificationsActive,
} from "@mui/icons-material";

const NotificationPage = () => {
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };
  const handleOpenNotificationModal = () => {
    setOpenModal(true);
  };
  const handleCloseNotificationModal = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid container spacing={0} justifyContent="center">
          <Item style={styles.bigItemStyle}>
            {loading === true && <LinearProgress />}
            <div style={styles.headerDiv}>
              <Typography sx={styles.headerTitle}>Notifications</Typography>
              <Button
                onClick={handleOpenNotificationModal}
                sx={styles.headerButton}
              >
                Sample Notification
              </Button>
              <Modal open={openModal} onClose={handleCloseNotificationModal}>
                <Box sx={styles.modalBoxStyle}>
                  <div style={styles.modalBoxIconDiv}>
                    <NotificationsActive style={styles.modalBoxIcon} />
                  </div>
                  <Typography style={styles.modalBoxTitle}>
                    Important Notification!
                  </Typography>
                  <Typography style={styles.modalBoxShortDescription}>
                    Tab switching attempt detected!
                  </Typography>
                  <Typography style={styles.modalBoxLongDescription}>
                    Giada attempted to change the tab. What do you want to do?
                  </Typography>
                  <div style={{ textAlign: "center" }}>
                    <Button style={styles.modalBoxButtonRestart}>
                      Restart Exam
                    </Button>
                    <Button style={styles.modalBoxButtonCancel}>
                      Finish Exam
                    </Button>
                  </div>
                </Box>
              </Modal>
            </div>
            <Divider style={{ marginBottom: 30 }} />
            <div>
              <Select
                style={styles.selectBox}
                value={sortBy}
                onChange={(event) => console.log(event.target.value)}
              >
                <MenuItem value={0}>
                  <ListItemIcon style={{ float: "left" }}>
                    <Sort />
                    <span style={{ marginLeft: 5, float: "right" }}>
                      Sort by
                    </span>
                  </ListItemIcon>
                </MenuItem>
                <MenuItem value={10}>Type</MenuItem>
                <MenuItem value={20}>Title</MenuItem>
                <MenuItem value={30}>Date</MenuItem>
              </Select>
              <Box sx={styles.searchBox}>
                <Search sx={{ color: "action.active", m: 1 }} />
                <TextField
                  label="Search"
                  variant="standard"
                  style={{ marginBottom: 3 }}
                />
              </Box>
            </div>
            <Grid container item spacing={5}>
              <List sx={styles.listStyle}>
                {[0, 1, 2, 3].map((value, index) => {
                  return (
                    <>
                      <ListItem
                        key={value}
                        button
                        onClick={() => handleClick(index)}
                        secondaryAction={
                          <>
                            <IconButton edge="end" aria-label="more">
                              <MoreHoriz style={styles.moreButton} />
                            </IconButton>
                          </>
                        }
                        disablePadding
                      >
                        <ListItemButton role={undefined} dense>
                          <ListItemText
                            primary={`Notification Title ${
                              value + 1
                            } ----- 11/20/2021 18:4${value + 1} ----- ${
                              value === 0 ? "Exam" : "Student"
                            } Notification ${value === 0 ? " ----- NEW" : ""}`}
                          />
                          {index === selectedIndex ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                      </ListItem>
                      <Collapse
                        in={index === selectedIndex}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div>
                          <Grid container spacing={2}>
                            {selectedIndex === 0 ? (
                              <>
                                <Grid item xs={12}>
                                  <Item style={styles.expandedItemLeftGrid}>
                                    <Typography style={styles.expandedTitle}>
                                      Notification Title {value + 1}
                                    </Typography>
                                    <Divider style={styles.divider} />
                                    <Typography
                                      style={
                                        styles.expandedDescriptionTimeAndType
                                      }
                                    >
                                      11/20/2021 18:4{value + 1} |{" "}
                                      {value === 0 ? "Exam" : "Student"}{" "}
                                      Notification
                                    </Typography>
                                    <Typography
                                      style={
                                        styles.expandedDescriptionFirstLong
                                      }
                                    >
                                      Et has minim elitr intellegat. Mea aeterno
                                      eleifend antiopam ad, nam no suscipit
                                      quaerendum. At nam minimum ponderum. Est
                                      audiam animal molestiae te. Ex duo eripuit
                                      mentitum?
                                    </Typography>
                                    <Typography
                                      style={
                                        styles.expandedDescriptionSecondLong
                                      }
                                    >
                                      Eleifend antiopam ad, nam no suscipit
                                      quaerendum. At nam minimum ponderum. Est
                                      audiam animal molestiae te.
                                    </Typography>
                                  </Item>
                                  <Item style={styles.expandedItemRightGrid}>
                                    <Paper
                                      variant="outlined"
                                      style={styles.expandedImage}
                                    >
                                      <img
                                        width="100%"
                                        src="/cheating_names.JPG"
                                      />
                                    </Paper>
                                  </Item>
                                </Grid>
                              </>
                            ) : (
                              <>
                                <Grid item xs={8}>
                                  <Item style={styles.expandedItemLeftGrid}>
                                    <Typography style={styles.expandedTitle}>
                                      Notification Title {value + 1}
                                    </Typography>
                                    <Divider style={styles.divider} />
                                    <Typography
                                      style={
                                        styles.expandedDescriptionTimeAndType
                                      }
                                    >
                                      11/20/2021 18:4{value + 1} |{" "}
                                      {value === 0 ? "Exam" : "Student"}{" "}
                                      Notification
                                    </Typography>
                                    <Typography
                                      style={
                                        styles.expandedDescriptionFirstLong
                                      }
                                    >
                                      Et has minim elitr intellegat. Mea aeterno
                                      eleifend antiopam ad, nam no suscipit
                                      quaerendum. At nam minimum ponderum. Est
                                      audiam animal molestiae te. Ex duo eripuit
                                      mentitum?
                                    </Typography>
                                    <Typography
                                      style={
                                        styles.expandedDescriptionSecondLong
                                      }
                                    >
                                      Eleifend antiopam ad, nam no suscipit
                                      quaerendum. At nam minimum ponderum. Est
                                      audiam animal molestiae te.
                                    </Typography>
                                  </Item>
                                </Grid>
                                <Grid item xs={4}>
                                  <Item style={styles.expandedItemRightGrid}>
                                    <Paper
                                      variant="outlined"
                                      style={styles.expandedImage}
                                    >
                                      <img
                                        width="100%"
                                        src="/home-logo-sample.png"
                                      />
                                    </Paper>
                                  </Item>
                                </Grid>
                              </>
                            )}
                          </Grid>
                        </div>
                      </Collapse>
                    </>
                  );
                })}
              </List>
            </Grid>
          </Item>
        </Grid>
      </Box>
    </div>
  );
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const styles = {
  bigItemStyle: {
    paddingLeft: 80,
    paddingRight: 80,
    width: "130vh",
    backgroundColor: "#2B2E39",
  },
  headerDiv: {
    justifyContent: "space-between",
    display: "flex",
    marginBottom: 10,
  },
  headerTitle: {
    float: "left",
    fontSize: 25,
    color: "#E3E4E5",
  },
  expandedTitle: {
    textAlign: "left",
    fontSize: 20,
    color: "#E3E4E5",
  },
  expandedDescriptionTimeAndType: {
    textAlign: "left",
    fontSize: 13,
    color: "#E3E4E5",
  },
  expandedDescriptionFirstLong: {
    textAlign: "left",
    marginTop: 10,
    fontSize: 13,
    color: "#E3E4E5",
  },
  expandedDescriptionSecondLong: {
    textAlign: "left",
    marginTop: 10,
    fontSize: 13,
    color: "#E3E4E5",
  },
  headerButton: {
    float: "right",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 2,
    height: 25,
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
  },
  modalBoxButtonRestart: {
    fontSize: 10,
    marginTop: 15,
    marginRight: 5,
    height: 25,
    backgroundColor: "#2B2E39",
    color: "#E3E4E5",
    borderColor: "#F8BE48",
    borderWidth: 1,
    borderStyle: "solid",
  },
  modalBoxButtonCancel: {
    fontSize: 10,
    marginTop: 15,
    marginLeft: 5,
    height: 25,
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
  },
  listStyle: {
    width: "100%",
    maxWidth: "100%",
    bgcolor: "#2B2E39",
    marginLeft: 5,
    marginTop: 2,
    color: "#E3E4E5",
  },
  moreButton: {
    color: "#E3E4E5",
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: "solid",
    borderColor: "#F8BE48",
  },
  divider: {
    marginTop: 2,
    marginBottom: 8,
  },
  expandedItemLeftGrid: {
    backgroundColor: "#20222B",
    margin: 5,
  },
  expandedItemRightGrid: {
    backgroundColor: "#20222B",
    margin: 5,
  },
  expandedImage: {
    backgroundColor: "#2B2E39",
    border: "none",
  },
  selectBox: {
    float: "left",
    width: 150,
    height: 40,
    justifyContent: "space-between",
    borderColor: "#F8BE48",
    borderWidth: 1,
    borderStyle: "solid",
  },
  searchBox: {
    display: "flex",
    alignItems: "flex-end",
    float: "right",
    width: 150,
    height: 40,
    borderColor: "#F8BE48",
    borderWidth: 1,
    borderRadius: 2,
    borderStyle: "solid",
  },
  modalBoxStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#2B2E39",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  modalBoxIconDiv: {
    textAlign: "center",
  },
  modalBoxIcon: {
    fontSize: 50,
  },
  modalBoxTitle: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  modalBoxShortDescription: {
    textAlign: "center",
    fontSize: 15,
  },
  modalBoxLongDescription: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 15,
  },
};
export default NotificationPage;
