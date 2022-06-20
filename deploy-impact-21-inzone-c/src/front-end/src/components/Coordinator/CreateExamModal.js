import React, { useState } from "react";
import {
  Typography,
  Box,
  Modal,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const CreateExamModal = (props) => {
  const { modalIsOpen, closeModal } = props;
  const [examName, setExamName] = useState("");
  const createExam = () => {
    let _data = {
      name: examName,
      createdBy: {
        __type: "Pointer",
        className: "_User",
        objectId: JSON.parse(localStorage.getItem("userInformation")).objectId,
      },
    };
    fetch(
      "https://inzone-c-parse.tools.deployimpact.ch/parse/classes/Exam",
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
        console.log(json);
        closeModal(true, examName);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal open={modalIsOpen} onClose={() => closeModal(true)}>
      <Box sx={styles.styleOfModal}>
        <Typography style={styles.modalTitle}>Write an exam name!</Typography>
        <TextField
          style={styles.textFieldStyle}
          onChange={(event) => setExamName(event.target.value)}
          focused
        />
        <Button
          variant="contained"
          color="success"
          style={styles.nextButton}
          onClick={() => createExam()}
        >
          Next
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
    width: 400,
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
};

export default CreateExamModal;
