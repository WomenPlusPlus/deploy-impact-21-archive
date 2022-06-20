import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const ExamComponent = (props) => {
  const [mcqIsDone, setMCQIsDone] = useState(false);
  const [capstoneProjectIsDone, setCapstoneProjectIsDone] = useState(false);
  const mcqSectionDone = () => {
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
        if (json.results[0].capstoneProjectFeedback !== undefined) {
          setCapstoneProjectIsDone(true);
        }else{
          setCapstoneProjectIsDone(false);
        }
        if (
          json.results[0].secondSection !== undefined &&
          json.results[0].secondSection !== null
        ) {
          setMCQIsDone(true);
        } else {
          fetch(
            `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/UserMCQAnswer?where={"userId":{"__type":"Pointer","className":"_User","objectId":"${
              JSON.parse(localStorage.getItem("userInformation")).objectId
            }"}}`,
            {
              method: "GET",
              headers: {
                "X-Parse-Application-Id": "inzonec",
              },
            }
          )
            .then((response) => response.json())
            .then((json2) => {
              let objectForUserAnswers = {
                isFinished: false,
                remainingTime: props.examInfo.mcqTotalTime,
              };
              json2.results.map((question, index) => {
                objectForUserAnswers["question" + index] = {};
                objectForUserAnswers["question" + index].id =
                  question.questionId.objectId;
                objectForUserAnswers["question" + index].time =
                  index === 0
                    ? props.examInfo.mcqTotalTime -
                      question.howManySecondsPassed
                    : objectForUserAnswers["question" + (index - 1)].time -
                      question.howManySecondsPassed;
                objectForUserAnswers["question" + index].answer =
                  question.answer;
              });
              localStorage.setItem(
                "userAnswers",
                JSON.stringify(objectForUserAnswers)
              );
              return false;
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    mcqSectionDone();
  }, []);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box component="span" m={1} style={styles.bigBox}>
          <Typography sx={styles.examPartLabel}>
            Live / Question Section
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              window.open(props.examInfo.firstSectionLink, "_blank").focus()
            }
            style={styles.examActionButton}
          >
            Begin
          </Button>
        </Box>
        <Box component="span" m={1} style={styles.bigBox}>
          <Typography sx={styles.examPartLabel}>
            MCQ Question Section
          </Typography>
          <Button
            onClick={() => {
              if (JSON.parse(localStorage.getItem("userAnswers")) === null) {
                let objectForUserAnswers = {
                  isFinished: false,
                  remainingTime: props.examInfo.mcqTotalTime,
                };
                localStorage.setItem(
                  "userAnswers",
                  JSON.stringify(objectForUserAnswers)
                );
              } else {
                let timeForLastAnswer = 999999999999999;
                for (const [key, value] of Object.entries(
                  JSON.parse(localStorage.getItem("userAnswers"))
                )) {
                  if (key.includes("question")) {
                    if (value.time < timeForLastAnswer) {
                      timeForLastAnswer = value.time;
                    }
                  } else {
                    timeForLastAnswer = props.examInfo.mcqTotalTime;
                  }
                }
                let endObject = {};
                for (const [key, value] of Object.entries(
                  JSON.parse(localStorage.getItem("userAnswers"))
                )) {
                  endObject[key] = value;
                }
                endObject.remainingTime = timeForLastAnswer;
                localStorage.setItem("userAnswers", JSON.stringify(endObject));
              }
              props.closeExamStepsTotally(true, true);
            }}
            disabled={mcqIsDone}
            variant="contained"
            style={
              mcqIsDone === true
                ? styles.examCompletedActionButton
                : styles.examActionButton
            }
          >
            {mcqIsDone === true ? "Completed" : "Begin"}
          </Button>
        </Box>
        <Box component="span" m={1} style={styles.bigBox}>
          <Typography sx={styles.examPartLabel}>
            Capstone Project
          </Typography>

          <Button
            variant="contained"
            style={
              capstoneProjectIsDone && capstoneProjectIsDone === true
                ? styles.examCompletedActionButton
                : styles.examActionButton
            }
            onClick={() => {
              props.closeExamStepsTotally(true, false);
            }}
            disabled={capstoneProjectIsDone && capstoneProjectIsDone === true}
          >
            {capstoneProjectIsDone && capstoneProjectIsDone === true
              ? "Completed"
              : "Begin"}
          </Button>
        </Box>
      </Box>
    </>
  );
};
const styles = {
  bigBox: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    display: "flex",
    border: "1px solid black",
    padding: 8,
  },
  examPartLabel: {
    mt: 2,
    mb: 1,
    color: "#E3E4E5",
  },
  examActionButton: {
    fontSize: 15,
    height: 40,
    color: "#2B2E39",
    backgroundColor: "#F8BE48",
  },
  examCompletedActionButton: {
    fontSize: 15,
    height: 40,
    color: "#2B2E39",
    backgroundColor: "#E2E3E4",
  },
};
export default ExamComponent;
