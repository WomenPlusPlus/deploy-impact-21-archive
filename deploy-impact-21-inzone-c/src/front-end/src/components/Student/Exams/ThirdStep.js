import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Typography,
  TextField,
  Divider,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import OptionalFeedbackModal from "./OptionalFeedbackModal";
import { Upload } from "@mui/icons-material";

const ThirdStep = (props) => {
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [capstoneProjectTextFeedback, setCapstoneProjectTextFeedback] =
    useState("I am very happy to finish this course.");
  const handleOpenFeedbackModal = () => {
    setOpenFeedbackModal(true);
  };
  const handleCloseFeedbackModal = () => {
    setOpenFeedbackModal(false);
  };
  return (
    <div style={{ paddingLeft: 50, paddingRight: 50 }}>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          marginBottom: 10,
        }}
      >
        <Typography sx={styles.headerTitle}>Capstone Project</Typography>
        <Typography sx={styles.headerInfo}>
          Lorem ipsum dolor est a mi mit.
        </Typography>
      </div>
      <Divider style={{ margin: 10 }} />
      <Grid item xs={12}>
        <Box m={1} style={styles.examBox}>
          <div
            style={{
              justifyContent: "center",
            }}
          >
            <Typography sx={styles.examTitleText}>Project File</Typography>
            <Typography
              sx={styles.examDescriptionText}
              variant="subtitle1"
              component="div"
            >
              Lorem ipsum dolor est a mi mit. Lorem ipsum dolor est a mi mit.
              Lorem ipsum dolor est a mi mit.
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton style={styles.iconText}>
              <Upload />
              Upload file
            </IconButton>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box m={1} style={styles.textFeedbackBox}>
          <div
            style={{
              justifyContent: "center",
            }}
          >
            <Typography sx={styles.examTitleText}>
              Text Feedback Input
            </Typography>
            <Typography sx={styles.examDescriptionText}>
              You can enter feedback regarding to this part of the exam here.
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              style={styles.textFeedbackInput}
              rows={4}
              value={capstoneProjectTextFeedback}
              onChange={(event) =>
                setCapstoneProjectTextFeedback(event.target.value)
              }
            />
          </div>
        </Box>
      </Grid>
      <div style={{ float: "right", marginRight: 8 }}>
        <Button
          variant="contained"
          style={styles.backButton}
          onClick={() => {
            props.backExam(true);
          }}
        >
          BACK
        </Button>
        <Button
          variant="contained"
          style={styles.submitButton}
          onClick={() => {
            //store the feedback
            let _data = {
              capstoneProjectTextFeedback: capstoneProjectTextFeedback,
            };
            fetch(
              `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/UserExam?where={"$and":[{"examId":{"__type":"Pointer","className":"Exam","objectId":"${
                props.examInfo.examId
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
                  .then((json) => {
                    handleOpenFeedbackModal();
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
          SUBMIT
        </Button>
      </div>
      <OptionalFeedbackModal
        modalIsOpen={openFeedbackModal}
        closeModal={(closeTime) => closeTime && handleCloseFeedbackModal()}
        finishModal={(finishModal) => finishModal && props.submitExam(true)}
      />
    </div>
  );
};
const Input = styled("input")({
  display: "none",
});
const styles = {
  headerTitle: {
    float: "left",
    fontSize: 25,
    color: "#E3E4E5",
  },
  headerInfo: {
    float: "right",
    fontSize: 10,
    marginTop: 3,
    color: "#AAABB0",
  },
  textFeedback: {
    mt: 2,
    mb: 1,
    color: "#E3E4E5",
    fontSize: 18,
    marginBottom: 3,
  },
  submitButton: {
    height: 35,
    marginLeft: 10,
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    borderRadius: 4,
  },
  backButton: {
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
  iconText: {
    fontSize: 15,
    width: "8rem",
    float: "right",
    margin: 7,
    color: "#E3E4E5",
    background: "#2B2E39",
    borderColor: "#E3E4E5",
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    justifyContent: "space-between",
  },
  examTitleText: {
    fontSize: 20,
    color: "#E3E4E5",
    textAlign: "left",
    mb: 1,
  },
  examDescriptionText: {
    fontSize: 10,
    color: "#AAABB0",
    textAlign: "left",
    mb: 3,
  },
  examBox: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 130,
    display: "flex",
    border: "1px solid black",
    backgroundColor: "#20222B",
    padding: 10,
    borderRadius: 10,
  },
  textFeedbackBox: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 260,
    display: "flex",
    border: "1px solid black",
    backgroundColor: "#20222B",
    padding: 10,
    borderRadius: 10,
  },
  textFeedbackInput: {
    backgroundColor: "#2B2E39",
    width: "120vh",
  },
};
export default ThirdStep;
