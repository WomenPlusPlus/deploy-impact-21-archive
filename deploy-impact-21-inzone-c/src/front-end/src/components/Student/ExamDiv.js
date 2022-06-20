import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { Create, PlaylistAddCheck } from "@mui/icons-material";
const ExamDiv = (props) => {
  const { examName, secondSectionStartDate, loadExam, handleOpenFeedbackModal, index } = props;
  return (
    <Grid item xs={12} key={index}>
      <Box m={1} style={styles.examBox}>
        <div
          style={{
            justifyContent: "center",
          }}
        >
          <Typography sx={styles.examTitleText}>{examName}</Typography>
          <Typography
            sx={styles.examDescriptionText}
            variant="subtitle1"
            component="div"
          >
            You will start at {new Date(secondSectionStartDate).toDateString()}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <IconButton onClick={() => loadExam(true)} style={styles.iconText}>
            <Create />
            Begin the exam
          </IconButton>
          <IconButton
            aria-label="next"
            onClick={() => handleOpenFeedbackModal(true)}
            style={styles.iconText}
          >
            <PlaylistAddCheck />
            Results of exam
          </IconButton>
        </div>
      </Box>
    </Grid>
  );
};
const styles = {
  iconText: {
    fontSize: 15,
    width: "11rem",
    float: "right",
    margin: 7,
    color: "#E3E4E5",
    background: "#2B2E39",
    borderColor: "#F8BE48",
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    justifyContent: 'space-between'
  },
  examTitleText: {
    fontSize: 20,
    color: "#E3E4E5",
    mt: 2,
    mb: 1,
  },
  examDescriptionText: {
    fontSize: 10,
    color: "#E3E4E5",
    mt: 2,
    mb: 1,
  },
  examBox: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 130,
    display: "flex",
    border: "1px solid black",
    backgroundColor: '#20222B',
    padding: 10,
    borderRadius: 10,
  },
};
export default ExamDiv;
