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

const CreateGroupModal = (props) => {
  const { modalIsOpen, closeModal, students } = props;
  const [groupName, setGroupName] = useState("");
  const [checkedStudents, setCheckStudents] = useState([]);
  const saveGroup = () => {
    console.log("groupName: ", groupName);
    let uniqueArrayStudents = checkedStudents.filter(function (item, pos) {
      return checkedStudents.indexOf(item) == pos;
    });
    console.log("students: ", uniqueArrayStudents);
    let _data = {
      name: groupName,
    };
    fetch(`https://inzone-c-parse.tools.deployimpact.ch/parse/classes/Group`, {
      method: "POST",
      body: JSON.stringify(_data),
      headers: {
        "X-Parse-Application-Id": "inzonec",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        closeModal(true, groupName);
        setCheckStudents([]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal open={modalIsOpen} onClose={() => closeModal(true)}>
      <Box sx={styles.styleOfModal}>
        <Typography style={styles.modalTitle}>
          Write a group name and assign the students!
        </Typography>
        <TextField
          style={styles.textFieldStyle}
          onChange={(event) => setGroupName(event.target.value)}
          focused
        />
        <div>
          <FormGroup style={{ marginTop: 15 }}>
            {students.map((student) => (
              <FormControlLabel
                key={student.objectId}
                control={<Checkbox style={{ color: "#E3E4E5" }} />}
                label={student.name}
                onClick={() =>
                  setCheckStudents((checkedStudents) => [
                    ...checkedStudents,
                    student.objectId,
                  ])
                }
              />
            ))}
          </FormGroup>
        </div>
        <Button
          variant="contained"
          color="success"
          style={styles.nextButton}
          onClick={() => saveGroup()}
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

export default CreateGroupModal;
