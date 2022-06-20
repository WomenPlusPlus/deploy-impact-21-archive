import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Modal,
  List,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
} from "@mui/material";
import {
  Send,
  CalendarToday,
  AddOutlined,
  Visibility,
} from "@mui/icons-material";
const UserAnalyticsModal = (props) => {
  const { modalIsOpen, closeModal } = props;
  const renderAnalyticsOfStudent = () => {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item style={styles.expandedItemRightGrid}>
              <Typography style={styles.analyticsTitles}>Attendance</Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/attendance.jpg" />
              </Paper>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item style={styles.expandedItemLeftGrid}>
              <Typography style={styles.analyticsTitles}>
                Distrubution
              </Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/zakias_score.png" />
              </Paper>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item style={styles.expandedItemRightGrid}>
              <Typography style={styles.analyticsTitles}>
                Sentiment Analysis
              </Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/sentimentanalysis.png" />
              </Paper>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={styles.expandedItemLeftGrid}>
              <Typography style={styles.analyticsTitles}>
                Completipn Time
              </Typography>
              <Paper variant="outlined" style={styles.expandedImage}>
                <img width="100%" src="/zakias_time.png" />
              </Paper>
            </Item>
          </Grid>
        </Grid>
      </div>
    );
  };
  const sendToProfessorButton = (name, group) => {
    return (
      <Button
        style={styles.expandedButton}
        onClick={() =>
          window.open(
            `mailto:professor@inzonec.com?subject=Exam Results of ${name} | ${group}`,
            "_blank"
          )
        }
      >
        <Send />
        Send to Professor
      </Button>
    );
  };
  return (
    <Modal open={modalIsOpen} onClose={() => closeModal(true)}>
      <Box sx={styles.styleOfModal}>
        <Typography style={styles.modalTitle}>Zakia's Informations</Typography>
        <Typography style={styles.modalTitle}>Exam Informations</Typography>
        <FormGroup style={{ marginTop: 15 }}>
          <FormControlLabel
            key={"firstSection"}
            control={<Checkbox style={{ color: "#E3E4E5" }} />}
            label={"Live Question | Score: 70/100"}
            onClick={() => console.log("FirstSection")}
          />
          <FormControlLabel
            key={"secondSection"}
            control={<Checkbox style={{ color: "#E3E4E5" }} />}
            label={"Multiple Choice Questions | Score: 100/100"}
            onClick={() => console.log("MCQSection")}
          />
          <FormControlLabel
            key={"thirdSection"}
            control={<Checkbox style={{ color: "#E3E4E5" }} />}
            label={"Capstone Project | Pending"}
            onClick={() => console.log("CapstoneProjectFeedbackSection")}
          />
        </FormGroup>
        <div style={{ marginBottom: 20 }}>
          <Button style={styles.expandedButton}>
            <CalendarToday />
            Notify Date {"&"} Time
          </Button>
          <Button style={styles.expandedButton}>
            <Visibility />
            View Answers
          </Button>
          {sendToProfessorButton("Zakia", "December Math Exam")}
        </div>
        {renderAnalyticsOfStudent()}
        <Button
          variant="contained"
          color="success"
          style={styles.nextButton}
          onClick={() => closeModal(true)}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};
const styles = {
  styleOfModal: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    maxHeight: "90vh",
    overflowY: "auto",
    backgroundColor: "#2B2E39",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 17,
    color: "#E3E4E5",
  },
  textFieldStyle: {
    color: "#E3E4E5",
    fontSize: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E3E4E5",
    marginTop: 15,
  },
  nextButton: {
    marginTop: 80,
    height: 30,
    float: "right",
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
  },
  uploadButton: {
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
    marginTop: 15,
  },
  expandedButton: {
    fontSize: 13,
    marginTop: 16,
    marginRight: 5,
    justifyContent: "space-between",
    fontWeight: "bold",
    height: 25,
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
  },
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
export default UserAnalyticsModal;
