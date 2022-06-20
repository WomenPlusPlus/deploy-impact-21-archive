import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Modal,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const AssignGroupModal = (props) => {
  const { modalIsOpen, closeModal, exam } = props;
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("Choose a group");
  const loadData = () => {
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
  const saveGroup = () => {
    if (selectedGroup !== "Choose a group") {
      let _data = {
        groupId: {
          __type: "Pointer",
          className: "Group",
          objectId: selectedGroup,
        },
      };
      fetch(`https://inzone-c-parse.tools.deployimpact.ch/parse/classes/Exam/${exam.objectId}`, {
        method: "PUT",
        body: JSON.stringify(_data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "X-Parse-Application-Id": "inzonec",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          closeModal(true, selectedGroup);
          setGroups([]);
        })
        .catch((err) => console.log(err));
    } else {
      closeModal(true);
    }
  };
  return (
    <Modal open={modalIsOpen} onClose={() => closeModal(true)}>
      <Box sx={styles.styleOfModal}>
        <Typography style={styles.modalTitle}>Choose a group name.</Typography>
        <div>
          <Select
            style={{
              float: "left",
              width: "100%",
              height: 40,
              marginTop: 20,
              justifyContent: "space-between",
              borderColor: "#F8BE48",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            value={selectedGroup}
            onChange={(event) => setSelectedGroup(event.target.value)}
          >
            <MenuItem
              key={"rand"}
              style={{ display: "none" }}
              value={"Choose a group"}
            >
              Choose a group
            </MenuItem>
            {groups.map((group) => (
              <MenuItem key={group.objectId} value={group.objectId}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
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

export default AssignGroupModal;
