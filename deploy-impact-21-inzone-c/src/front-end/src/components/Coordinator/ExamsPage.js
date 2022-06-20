import React, { useState, useEffect } from "react";
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
  TextField,
  Select,
  MenuItem,
  Button,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Popover,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ExpandLess,
  ExpandMore,
  Sort,
  Search,
  Upload,
  Send,
  CalendarToday,
  Download,
  Visibility,
  InsertDriveFile,
  AddCircleOutlined,
  Save,
  AddOutlined,
} from "@mui/icons-material";
import ModalUpload from "../ModalUpload";
import CreateExamModal from "./CreateExamModal";
import AssignGroupModal from "./AssignGroupModal";

const ExamsPage = () => {
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [openModalUploadExam, setOpenModalUploadExam] = useState(false);
  const [openModalCreateExam, setOpenModalCreateExam] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [meetingLink, setMeetingLink] = useState("");
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [openAssignGroupModal, setOpenAssignGroupModal] = useState(false);
  const handleClick = (index, value) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
      setSelectedExam("");
    } else {
      setSelectedIndex(index);
      setSelectedExam(value);
    }
  };
  const handleCloseLinkPopover = () => {
    setAnchorEl(null);
  };
  const loadData = () => {
    fetch(
      `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/Exam?include=examLocation&include=createdBy&include=groupId`,
      {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "inzonec",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json.results);
        setExams(json.results);
      })
      .catch((err) => console.log(err));
  };
  const changeStatusOfAnExam = () => {
    let _data = {
      examState: "In Progress",
    };
    fetch(
      "https://inzone-c-parse.tools.deployimpact.ch/parse/classes/Exam/" +
        selectedExam.objectId,
      {
        method: "POST",
        body: JSON.stringify(_data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Parse-Application-Id": "inzonec",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("json: ", json);
        loadData();
      })
      .catch((err) => console.log(err));
  };
  const renderExamList = (value, index) => {
    if (value.examState === "Pending") {
      return (
        <>
          <ListItem
            key={value}
            button
            onClick={() => handleClick(index)}
            style={{ marginTop: 30 }}
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText
                primary={
                  <Typography style={{ fontSize: 25, color: "#E3E4E5" }}>
                    {value.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography style={{ fontSize: 10, color: "#75777E" }}>
                      Lorem ipsum dolor es at mit. Vix ad senserit salutandi
                      argumentum.
                    </Typography>
                    <Typography style={{ fontSize: 10, color: "#75777E" }}>
                      Assum suavitate ea vel, vero erat doming cu cum. Zril
                      ornatus sea cu. Pro ex pertinax.
                    </Typography>
                  </>
                }
              />
              {index === selectedIndex ? (
                <ExpandLess style={styles.moreButton} />
              ) : (
                <ExpandMore style={styles.moreButton} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Item style={styles.expandedItemLeftGrid}>
                    <FormGroup style={{ marginTop: 15 }}>
                      <FormControlLabel
                        key={"firstSection"}
                        control={<Checkbox style={{ color: "#E3E4E5" }} />}
                        label={"Live Question | Video Meeting Link"}
                        onClick={() => console.log("FirstSection")}
                      />
                      <FormControlLabel
                        key={"secondSection"}
                        control={<Checkbox style={{ color: "#E3E4E5" }} />}
                        label={"Multiple Choice Questions | File"}
                        onClick={() => console.log("MCQSection")}
                      />
                      <FormControlLabel
                        key={"thirdSection"}
                        control={<Checkbox style={{ color: "#E3E4E5" }} />}
                        label={"Capstone Project"}
                        onClick={() =>
                          console.log("CapstoneProjectFeedbackSection")
                        }
                      />
                    </FormGroup>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item style={styles.expandedItemRightGrid}>
                    <Button
                      aria-describedby={"popver-link"}
                      style={styles.expandedButton}
                      onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                      <AddCircleOutlined />
                      Create Link
                    </Button>
                    <Popover
                      id={Boolean(anchorEl) ? "popover-link" : undefined}
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={handleCloseLinkPopover}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>
                        Write the video meeting link.
                      </Typography>
                      <TextField
                        style={styles.textFieldStyle}
                        onChange={(event) => setMeetingLink(event.target.value)}
                        focused
                      />
                    </Popover>
                    <Button
                      onClick={() => setOpenModalUploadExam(true)}
                      style={styles.expandedButton}
                    >
                      <Upload />
                      File Upload for MCQ
                    </Button>
                    <Button
                      onClick={() => changeStatusOfAnExam()}
                      style={styles.expandedButton}
                    >
                      <Save />
                      Save
                    </Button>
                  </Item>
                </Grid>
              </Grid>
            </div>
          </Collapse>
        </>
      );
    } else {
      return (
        <>
          <ListItem
            key={value.objectId}
            button
            onClick={() => handleClick(index, value)}
            style={{ marginTop: 30 }}
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText
                primary={
                  <Typography style={{ fontSize: 25, color: "#E3E4E5" }}>
                    {value.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography style={{ fontSize: 10, color: "#75777E" }}>
                      {value.description}
                    </Typography>
                  </>
                }
              />
              {index === selectedIndex ? (
                <ExpandLess style={styles.moreButton} />
              ) : (
                <>
                  {value.groupId === undefined ? (
                    <Chip
                      label={`Assign a group`}
                      style={{
                        marginRight: 5,
                        backgroundColor: "#F8BE48",
                        color: "#2B2E39",
                      }}
                    />
                  ) : (
                    <Chip
                      label={value.groupId.name}
                      style={{ marginRight: 5 }}
                    />
                  )}
                  <Chip
                    label={`${new Date(
                      value.secondSectionStartDate.iso
                    ).toDateString()}`}
                    style={{ marginRight: 5 }}
                  />
                  <Chip label={value.examState} style={{ marginRight: 5 }} />
                  <ExpandMore style={styles.moreButton} />
                </>
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Item style={styles.expandedItemLeftGrid}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Item style={styles.expandedItemLeftGrid}>
                          <Typography
                            style={styles.expandedDescriptionTimeAndType}
                          >
                            Date Scheduled
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item style={styles.expandedItemRightGrid}>
                          <Chip
                            label={`${new Date(
                              value.secondSectionStartDate.iso
                            ).toDateString()}`}
                          />
                        </Item>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Item style={styles.expandedItemLeftGrid}>
                          <Typography
                            style={styles.expandedDescriptionTimeAndType}
                          >
                            Class / Group
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={4}>
                        <Item style={styles.expandedItemRightGrid}>
                          {value.groupId === undefined ? (
                            <Chip
                              label={`Assign a group`}
                              style={{
                                marginRight: 5,
                                backgroundColor: "#F8BE48",
                                color: "#2B2E39",
                              }}
                              onClick={() => setOpenAssignGroupModal(true)}
                            />
                          ) : (
                            <Chip
                              label={`Group Name #${index + 1}`}
                              style={{ marginRight: 5 }}
                            />
                          )}
                        </Item>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <Item style={styles.expandedItemLeftGrid}>
                          <Typography
                            style={styles.expandedDescriptionTimeAndType}
                          >
                            Students
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={10}>
                        <Item style={styles.expandedItemRightGrid}>
                          <div style={{ float: "right" }}>
                            {value.groupId === undefined ? (
                              <>
                                <Chip
                                  label="Assign a group above."
                                  style={{ marginRight: 5 }}
                                />
                              </>
                            ) : (
                              <>
                                <Chip
                                  label="Giada"
                                  style={{ marginRight: 5 }}
                                />
                                <Chip
                                  label="Zakia"
                                  style={{ marginRight: 5 }}
                                />
                                <Chip
                                  label="Namrata"
                                  style={{ marginRight: 5 }}
                                />
                                <Chip
                                  label="More..."
                                  style={{ marginRight: 5 }}
                                />
                              </>
                            )}
                          </div>
                        </Item>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <Item style={styles.expandedItemLeftGrid}>
                          <div
                            style={{
                              display: "flex",
                              float: "left",
                            }}
                          >
                            <Typography
                              style={styles.expandedDescriptionTimeAndType}
                            >
                              Status
                            </Typography>
                          </div>
                        </Item>
                      </Grid>
                      <Grid item xs={10}>
                        <Item style={styles.expandedItemRightGrid}>
                          <div
                            style={{
                              display: "flex",
                              float: "right",
                            }}
                          >
                            <Chip
                              label={value.examState}
                              style={{ marginRight: 5 }}
                            />
                          </div>
                        </Item>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item style={styles.expandedItemRightGrid}>
                    <Button style={styles.expandedButton}>
                      <CalendarToday />
                      Notify Date {"&"} Time
                    </Button>
                    <Button style={styles.expandedButton}>
                      <Download />
                      Download
                    </Button>
                    <Button style={styles.expandedButton}>
                      <Visibility />
                      View / Edit Exam
                    </Button>
                    <Button style={styles.expandedButton}>
                      <InsertDriveFile />
                      Analytics
                    </Button>
                    <Button style={styles.expandedButton}>
                      <AddOutlined />
                      Add Exam Section
                    </Button>
                  </Item>
                </Grid>
              </Grid>
            </div>
          </Collapse>
        </>
      );
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          height: "110vh",
        }}
      >
        <CssBaseline />
        <Grid container spacing={0} justifyContent="center">
          <Item style={styles.bigItemStyle}>
            {loading === true && <LinearProgress />}
            <div style={styles.headerDiv}>
              <Typography sx={styles.headerTitle}>Exams</Typography>
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
                      Filter
                    </span>
                  </ListItemIcon>
                </MenuItem>
                <MenuItem value={10}>Date</MenuItem>
                <MenuItem value={20}>Group</MenuItem>
                <MenuItem value={30}>Course</MenuItem>
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
            <div>
              <Button
                onClick={() => setOpenModalCreateExam(true)}
                style={styles.headerButton}
              >
                <AddCircleOutlined />
                Create Exam
              </Button>
            </div>
            <Grid container item spacing={5}>
              <List sx={styles.listStyle}>
                {exams.map((value, index) => renderExamList(value, index))}
              </List>
            </Grid>
          </Item>
        </Grid>
      </Box>
      <CreateExamModal
        modalIsOpen={openModalCreateExam}
        closeModal={(closeTime, examName) => {
          if (closeTime) {
            if (examName !== undefined) {
              loadData();
              setOpenModalCreateExam(false);
            }
            setOpenModalCreateExam(false);
          }
        }}
      />
      <ModalUpload
        modalIsOpen={openModalUploadExam}
        closeModal={(closeTime, mcQuestions) => {
          if (closeTime) {
            if (mcQuestions !== undefined) {
              loadData();
              setOpenModalUploadExam(false);
            }
            setOpenModalUploadExam(false);
          }
        }}
      />
      <AssignGroupModal
        modalIsOpen={openAssignGroupModal}
        exam={selectedExam}
        closeModal={(closeTime, groupId) => {
          if (closeTime) {
            if (groupId !== undefined) {
              loadData();
              setOpenAssignGroupModal(false);
            }
            setOpenAssignGroupModal(false);
          }
        }}
      />
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
    fontSize: 12,
    fontWeight: "bold",
    height: 40,
    marginRight: 7,
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
  },
  expandedButton: {
    fontSize: 13,
    marginTop: 16,
    width: "100%",
    justifyContent: "space-between",
    fontWeight: "bold",
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
    float: "left",
    width: 150,
    height: 40,
    marginLeft: 2,
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
    fontSize: 10,
    marginTop: 30,
  },
  textFieldStyle: {
    color: "#E3E4E5",
    fontSize: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E3E4E5",
    margin: 15,
  },
};
export default ExamsPage;
