import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Divider,
  Button,
  Grid,
} from "@mui/material";

const OptionalFeedbackModal = (props) => {
  const { modalIsOpen, closeModal } = props;
  const [optionalFeedback, setOptionalFeedback] = useState(
    "MCQ section was very hard. Live question section was very funny."
  );
  return (
    <Modal open={modalIsOpen} onClose={() => closeModal(true)}>
      <Box sx={styles.modal}>
        <Typography style={styles.text}>
          You have successfully finished your exam!!
        </Typography>
        <Typography style={styles.text}>
          You will receive a notification when your exam has been evaluated.
        </Typography>
        <Typography style={styles.text}>
          You can enter feedback regarding the exam below.
        </Typography>
        <div
          style={{
            justifyContent: "center",
          }}
        >
          <TextField
            id="outlined-multiline-static"
            multiline
            style={styles.textFeedbackInput}
            rows={4}
            value={optionalFeedback}
            onChange={(event) => setOptionalFeedback(event.target.value)}
          />
        </div>
        <Divider style={styles.divider} />
        <Button
          variant="contained"
          style={styles.skipButton}
          onClick={() => {
            props.finishModal(true);
          }}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          color="success"
          style={styles.closeButton}
          onClick={() => {
            // Save the feedback and send user to the exams page
            let _data = {
              optionalFeedback: optionalFeedback,
            };
            fetch(
              `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/UserExam?where={"$and":[{"examId":{"__type":"Pointer","className":"Exam","objectId":"${
                JSON.parse(localStorage.getItem("exam")).examId
              }"}}, {"userId":{"__type":"Pointer","className":"_User","objectId":"${
                JSON.parse(localStorage.getItem("userInformation")).objectId
              }"}}]}`,
              {
                method: "GET",
                headers: {
                  "X-Parse-Application-Id": "inzonec",
                },
              }
            )
              .then((response) => response.json())
              .then((json) => {
                console.log('josn: ', json)
                fetch(
                  `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/UserExam/${json.results[0].objectId}`,
                  {
                    method: "PUT",
                    body: JSON.stringify(_data),
                    headers: {
                      "X-Parse-Application-Id": "inzonec",
                    },
                  }
                )
                  .then((response) => response.json())
                  .then((json2) => {
                    console.log('last: ', json2)
                    props.finishModal(true);
                  })
                  .catch((err) => console.log("err: ", err.message));
              })
              .catch((err) => {
                if (err.message === "Failed to fetch") {
                  alert(
                    "Connection lost. You can still solve questions. But the results will send to the cloud when the connection success again."
                  );
                }
              });
          }}
        >
          FINISH
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
    height: 35,
    marginLeft: 10,
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    borderRadius: 4,
  },
  skipButton: {
    height: 35,
    textAlign: "center",
    marginLeft: 10,
    backgroundColor: "#2B2E39",
    color: "#E3E4E5",
    fontWeight: "bold",
    fontSize: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E3E4E5",
    borderStyle: "solid",
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  textFeedbackInput: {
    backgroundColor: "#2B2E39",
    width: "60vh",
  },
};

export default OptionalFeedbackModal;
