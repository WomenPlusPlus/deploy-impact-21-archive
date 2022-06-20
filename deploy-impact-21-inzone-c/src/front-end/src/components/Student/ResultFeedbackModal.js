import React from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Divider,
  Button,
} from "@mui/material";

const ResultFeedbackModal = (props) => {
  const { userExamInfo, modalIsOpen, closeModal } = props;

  return (
    <Modal open={modalIsOpen} onClose={() => closeModal(true)}>
      <Box sx={styles.modal}>
        <Typography id="modal-modal-title" sx={styles.text}>
          Here is the feedbacks.
        </Typography>
        <div style={styles.feedbackContainer}>
          <TextField
            id="outlined-multiline-static"
            label="Your Feedback"
            multiline
            disabled
            rows={5}
            style={{ marginRight: 20 }}
            defaultValue={userExamInfo.capstoneProjectTextFeedback}
          />
          <TextField
            id="outlined-multiline-static"
            label="Coordinator's Feedback"
            multiline
            disabled
            rows={4}
            style={{ marginLeft: 20 }}
            defaultValue="I am glad you like it. We tried to ask hard but you finished it successfully."
          />
          <Divider style={styles.divider} />
        </div>
        <Typography id="modal-modal-title" sx={styles.text}>
          Here is the results.
        </Typography>
        <div style={styles.resultContainer}>
        <Typography id="modal-modal-title" sx={styles.text}>
          Total Point = {(userExamInfo.firstSection + userExamInfo.secondSection + userExamInfo.thirdSection) / 3}
        </Typography>
        <Typography id="modal-modal-title" sx={styles.text}>
          Live Question Section Point = {userExamInfo.firstSection}
        </Typography>
        <Typography id="modal-modal-title" sx={styles.text}>
          MCQ Question Section Point = {userExamInfo.secondSection}
        </Typography>
        <Typography id="modal-modal-title" sx={styles.text}>
          Third Question Section Point = {userExamInfo.thirdSection}
        </Typography>
        </div>
        <Button
          style={styles.closeButton}
          onClick={() => {
            closeModal(true);
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#20222B",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  text: {
    marginBottom: 5,
    color: "#E3E4E5",
    background: "#20222B",
    borderRadius: 0,
  },
  feedbackContainer: {
    textAlign: "center",
    justifyContent: "center",
  },
  resultContainer: {
    textAlign: "center",
    justifyContent: "center",
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  closeButton: {
    height: 40,
    fontSize: 15,
    color: "#20222B",
    background: "#F8BE48",
  },
};

export default ResultFeedbackModal;
