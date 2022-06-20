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
  IconButton,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  MoreHoriz,
  ExpandLess,
  ExpandMore,
  Sort,
  Search,
  Groups,
} from "@mui/icons-material";
import CreateGroupModal from "./CreateGroupModal";
import UserAnalyticsModal from "./UserAnalyticsModal";

const StudentsPage = () => {
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [selectedNestedIndex, setSelectedNestedIndex] = useState("");
  const [openUserAnalyticsModal, setOpenUserAnalyticsModal] = useState(false);
  const [choosenCategory, setChoosenCategory] = useState("groups");
  const [openModal, setOpenModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };
  const handleNestedClick = (index) => {
    if (selectedNestedIndex === index) {
      setSelectedNestedIndex("");
    } else {
      setSelectedNestedIndex(index);
    }
  };
  const renderNestedStudentList = (value, index) => {
    return (
      <>
        <ListItem
          key={value.objectId}
          onClick={() => setOpenUserAnalyticsModal(true)}
          disablePadding
        >
          <ListItemButton role={undefined} dense>
            <ListItemText
              primary={`${value.name} ----- ID: ${value.objectId} ----- Age: ${value.age}`}
            />
          </ListItemButton>
        </ListItem>
      </>
    );
  };
  const renderAnalyticsOfGroup = () => {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item style={styles.expandedItemLeftGrid}>
              <Typography style={styles.analyticsTitles}>
                Distrubution
              </Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/some_distrubution.png" />
              </Paper>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item style={styles.expandedItemRightGrid}>
              <Typography style={styles.analyticsTitles}>WordCloud</Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/wordcloud.jpg" />
              </Paper>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item style={styles.expandedItemLeftGrid}>
              <Typography style={styles.analyticsTitles}>
                Sentiment Analysis
              </Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/sentimentanalysis.png" />
              </Paper>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={styles.expandedItemRightGrid}>
              <Typography style={styles.analyticsTitles}>
                Average Exam Time
              </Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/averageexamtime.png" />
              </Paper>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item style={styles.expandedItemLeftGrid}>
              <Typography style={styles.analyticsTitles}>Age</Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/age_marks.png" />
              </Paper>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item style={styles.expandedItemLeftGrid}>
              <Typography style={styles.analyticsTitles}>
                Male/Female
              </Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/gender_marks.png" />
              </Paper>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item style={styles.expandedItemRightGrid}>
              <Typography style={styles.analyticsTitles}>Attendance</Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/attendance.jpg" />
              </Paper>
            </Item>
          </Grid>
        </Grid>
      </div>
    );
  };
  const renderGroupList = (value, index) => {
    return (
      <>
        <ListItem
          key={value.objectId}
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
              primary={`${value.name} ----- Course Name #${
                index + 1
              } ----- Exam Date 0${index + 1}/20/2021`}
            />
            {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
          <div>
            <List sx={styles.nestedListStyle}>
              <ListItem
                key={value}
                button
                onClick={() => handleNestedClick(0)}
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
                  <ListItemText primary={`Students`} />
                  {0 === selectedNestedIndex ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse
                in={0 === selectedNestedIndex}
                timeout="auto"
                unmountOnExit
              >
                <List sx={styles.studentListStyle}>
                  {students.map((value, index) =>
                    renderNestedStudentList(value, index)
                  )}
                </List>
              </Collapse>

              <ListItem
                key={value}
                button
                onClick={() => handleNestedClick(1)}
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
                  <ListItemText primary={`Analytics of Group`} />
                  {1 === selectedNestedIndex ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse
                in={1 === selectedNestedIndex}
                timeout="auto"
                unmountOnExit
              >
                {renderAnalyticsOfGroup()}
              </Collapse>
            </List>
          </div>
        </Collapse>
      </>
    );
  };
  const renderNestedExamList = (value, index) => {
    return (
      <>
        <ListItem key={value} disablePadding>
          <ListItemButton role={undefined} dense>
            <ListItemText
              primary={`Exam Name #${value + 1} ----- Exam Score #${
                value + 1
              } ----- Exam Date 0${value + 1}/20/2021`}
            />
          </ListItemButton>
        </ListItem>
      </>
    );
  };
  const renderStudentList = (value, index) => {
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
              primary={`Student Name #${value + 1} ----- StudentAge #${
                value + 1
              } ----- Date of Birth 0${value + 1}/20/1995`}
            />
            {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
          <div>
            <List sx={styles.nestedListStyle}>
              <ListItem
                key={value}
                button
                onClick={() => handleNestedClick(0)}
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
                  <ListItemText primary={`Exams`} />
                  {0 === selectedNestedIndex ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse
                in={0 === selectedNestedIndex}
                timeout="auto"
                unmountOnExit
              >
                <List sx={styles.studentListStyle}>
                  {[0, 1, 2, 3].map((value, index) =>
                    renderNestedExamList(value, index)
                  )}
                </List>
              </Collapse>
              <ListItem
                key={value}
                button
                onClick={() => handleNestedClick(1)}
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
                  <ListItemText primary={`Analytics`} />
                  {1 === selectedNestedIndex ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse
                in={1 === selectedNestedIndex}
                timeout="auto"
                unmountOnExit
              >
                {renderAnalyticsOfGroup()}
              </Collapse>
            </List>
          </div>
        </Collapse>
      </>
    );
  };
  const loadData = () => {
    fetch(
      `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/_User?where={"role":"student"}&include=createdBy`,
      {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "inzonec",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setStudents(json.results);
      })
      .catch((err) => console.log(err));
    fetch(`https://inzone-c-parse.tools.deployimpact.ch/parse/classes/Group`, {
      method: "GET",
      headers: {
        "X-Parse-Application-Id": "inzonec",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setGroups(json.results);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          height: "190vh",
        }}
      >
        <CssBaseline />
        <Grid container spacing={0} justifyContent="center">
          <Item style={styles.bigItemStyle}>
            {loading === true && <LinearProgress />}
            <div style={styles.headerDiv}>
              <Typography sx={styles.headerTitle}>Students / Groups</Typography>
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
              <Button
                onClick={() => setChoosenCategory("students")}
                style={styles.studentsButton}
              >
                Students
              </Button>
              <Button
                onClick={() => setChoosenCategory("groups")}
                style={styles.groupsButton}
              >
                Groups
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setOpenModal(true)}
                style={styles.headerButton}
              >
                <Groups />
                Create Group
              </Button>
            </div>
            <Grid container item spacing={5}>
              {choosenCategory === "groups" ? (
                <List sx={styles.listStyle}>
                  {groups.map((value, index) => renderGroupList(value, index))}
                </List>
              ) : null}
              {choosenCategory === "students" ? (
                <List sx={styles.listStyle}>
                  {[0, 1, 2, 3].map((value, index) =>
                    renderStudentList(value, index)
                  )}
                </List>
              ) : null}
            </Grid>
          </Item>
        </Grid>
      </Box>
      <UserAnalyticsModal
        modalIsOpen={openUserAnalyticsModal}
        closeModal={(closeTime) => closeTime && setOpenUserAnalyticsModal(false)}
      />
      <CreateGroupModal
        modalIsOpen={openModal}
        students={students}
        closeModal={(closeTime, groupName) => {
          if (closeTime) {
            if (groupName !== undefined) {
              loadData();
              setOpenModal(false);
            }
            setOpenModal(false);
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
    fontSize: 11,
    fontWeight: "bold",
    height: 35,
    marginRight: 7,
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
  },
  studentsButton: {
    float: "left",
    fontSize: 11,
    fontWeight: "bold",
    height: 35,
    marginLeft: 7,
    marginRight: 7,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F8BE48",
    backgroundColor: "#2B2E39",
    color: "#E3E4E5",
  },
  groupsButton: {
    float: "left",
    fontSize: 11,
    fontWeight: "bold",
    height: 35,
    marginRight: 7,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F8BE48",
    backgroundColor: "#2B2E39",
    color: "#E3E4E5",
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
  nestedListStyle: {
    width: "100%",
    maxWidth: "100%",
    bgcolor: "#2B2E39",
    marginTop: 0,
    marginLeft: 3,
    color: "#E3E4E5",
  },
  studentListStyle: {
    width: "100%",
    maxWidth: "100%",
    bgcolor: "#2B2E39",
    marginTop: 0,
    marginLeft: 3,
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
    height: 35,
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
    height: 35,
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
  analyticsTitles: {
    fontSize: 21,
    color: "#E3E4E5",
    fontWeight: "bold",
    marginBottom: 5,
  },
};
export default StudentsPage;
