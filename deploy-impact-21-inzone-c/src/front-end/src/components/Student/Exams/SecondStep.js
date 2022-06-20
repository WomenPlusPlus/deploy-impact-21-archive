import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  chipStyle: {
    cursor: "pointer",
    margin: "10px 5px",
    background: "black",
    color: "white",
  },
  chipNextStyle: {
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
    fontWeight: "bold",
    fontSize: 13,
    borderRadius: 5,
    width: 70,
    margin: "10px 5px",
  },
  navButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const SecondStep = (props) => {
  const [seconds, setSeconds] = useState(
    JSON.parse(localStorage.getItem("userAnswers")).remainingTime
  );
  const [connectionLost, setConnectionLost] = useState(false);
  const classes = useStyles();
  const [questionNo, setQuestionNo] = useState(0);
  const [answer, setAnswer] = useState(0);
  const questionHandler = () => {
    for (const [key, value] of Object.entries(
      JSON.parse(localStorage.getItem("userAnswers"))
    )) {
      if (key.includes("question")) {
        if (questionNo == key.split("question")[1]) {
          let newQuestionNo = questionNo + 1;
          setQuestionNo(newQuestionNo);
        }
      }
    }
  };
  const connectionHandler = () => {
    fetch(
      `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/MultipleChoiceQuestion`,
      {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "inzonec",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => setConnectionLost(false))
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          setConnectionLost(true);
        }
      });
  };
  const nextQuestion = () => {
    connectionHandler();
    //add to local storage
    let newQuestionNo = questionNo + 1;
    let endObject = {};
    for (const [key, value] of Object.entries(
      JSON.parse(localStorage.getItem("userAnswers"))
    )) {
      endObject[key] = value;
    }
    let theObjectIdOfQuestion = props.examInfo.mcq[questionNo].objectId;
    endObject["question" + questionNo] = {};
    endObject["question" + questionNo].id = theObjectIdOfQuestion;
    endObject["question" + questionNo].answer = answer;
    endObject["question" + questionNo].time = seconds;
    localStorage.setItem("userAnswers", JSON.stringify(endObject));

    //add to cloud storage
    let _data = {
      answer: parseInt(answer),
      howManySecondsPassed:
        questionNo !== 0
          ? endObject["question" + (questionNo - 1)].time - seconds
          : props.examInfo.mcqTotalTime -
            endObject["question" + questionNo].time,
      questionId: {
        __type: "Pointer",
        className: "MultipleChoiceQuestion",
        objectId: props.examInfo.mcq[questionNo].objectId,
      },
      userId: {
        __type: "Pointer",
        className: "_User",
        objectId: JSON.parse(localStorage.getItem("userInformation")).objectId,
      },
    };
    fetch(
      "https://inzone-c-parse.tools.deployimpact.ch/parse/classes/UserMCQAnswer",
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
        setConnectionLost(false);
      })
      .catch((err) => {
        if (err.message === "Failed to fetch" && connectionLost === false) {
          alert(
            "Connection lost. You can still solve questions. But the results will send to the cloud when the connection success again."
          );
          setConnectionLost(true);
        }
      });

    setQuestionNo(newQuestionNo);
    setAnswer(0);
  };
  useEffect(() => {
    questionHandler();
    connectionHandler();
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
      alert("Time is Up!");
      if (connectionLost === false) {
        finishExam();
      }
    }
  });
  const sendAnswersToCloudOnFinish = () => {
    let endObject = {};
    for (const [key, value] of Object.entries(
      JSON.parse(localStorage.getItem("userAnswers"))
    )) {
      endObject[key] = value;
    }
    endObject.isFinished = true;
    let theObjectIdOfQuestion = props.examInfo.mcq[questionNo].objectId;
    endObject["question" + questionNo] = {};
    endObject["question" + questionNo].id = theObjectIdOfQuestion;
    endObject["question" + questionNo].answer = answer;
    endObject["question" + questionNo].time = seconds;
    localStorage.setItem("userAnswers", JSON.stringify(endObject));
    for (const [key, value] of Object.entries(endObject)) {
      if (key !== "isFinished" || key !== "remainingTime") {
        fetch(
          `https:inzone-c-parse.tools.deployimpact.ch/parse/classes/UserMCQAnswer?where={"$and":[{"questionId":{"__type":"Pointer","className":"MultipleChoiceQuestion","objectId":"${
            endObject[key].id
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
            if (json.results.length === 0) {
              //add this question
              let _data = {
                answer: parseInt(endObject[key].answer),
                howManySecondsPassed:
                  key.split("question")[1] !== "0"
                    ? endObject[
                        "question" + (parseInt(key.split("question")[1]) - 1)
                      ].time - endObject[key].time
                    : props.examInfo.mcqTotalTime - endObject[key].time,
                questionId: {
                  __type: "Pointer",
                  className: "MultipleChoiceQuestion",
                  objectId: endObject[key].id,
                },
                userId: {
                  __type: "Pointer",
                  className: "_User",
                  objectId: JSON.parse(localStorage.getItem("userInformation"))
                    .objectId,
                },
              };
              fetch(
                "https://inzone-c-parse.tools.deployimpact.ch/parse/classes/UserMCQAnswer",
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
                  fetch(
                    `https:inzone-c-parse.tools.deployimpact.ch/parse/classes/UserMCQAnswer?where={"userId":{"__type":"Pointer","className":"_User","objectId":"${
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
                    .then((json) => {
                      let totalTime = 0;
                      let totalPoint = 0;
                      let questionPoint = 100 / JSON.parse(localStorage.getItem("exam")).mcq.length;
                      json.results.map((userAnswer) => {
                        if(JSON.parse(localStorage.getItem("exam")).mcq.find((item) => item.objectId === userAnswer.questionId.objectId).trueAnswer === userAnswer.answer){
                          totalPoint += questionPoint;
                        }
                        totalTime += userAnswer.howManySecondsPassed;
                      })

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
                          let _data = {
                            secondSection: totalPoint,
                            totalTimeToFinishSecondSection: totalTime
                          }
                          fetch(
                            `https:inzone-c-parse.tools.deployimpact.ch/parse/classes/UserExam/${json.results[0].objectId}`,
                            {
                              method: "PUT",
                              body: JSON.stringify(_data),
                              headers: {
                                "X-Parse-Application-Id": "inzonec",
                              },
                            }
                          )
                            .then((response) => response.json())
                            .then((json) => {})
                            .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                    }).catch(err => console.log(err))

                })
                .catch((err) => {
                  if (
                    err.message === "Failed to fetch" &&
                    connectionLost === false
                  ) {
                    console.log(
                      "Connection lost. You can still solve questions. But the results will send to the cloud when the connection success again."
                    );
                    setConnectionLost(true);
                  }
                });
            }
          })
          .catch((err) => {
            if (err.message === "Failed to fetch" && connectionLost === false) {
              console.log(
                "Connection lost. You can still solve questions. But the results will send to the cloud when the connection success again."
              );
              setConnectionLost(true);
            }
          });
      }
    }
    props.finishExam(true);
  };
  const finishExam = () => {
    connectionHandler();
    if (connectionLost === true) {
      fetch(
        `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/MultipleChoiceQuestion`,
        {
          method: "GET",
          headers: {
            "X-Parse-Application-Id": "inzonec",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          setConnectionLost(false);
          sendAnswersToCloudOnFinish();
        })
        .catch((err) => {
          if (err.message === "Failed to fetch") {
            alert(
              "You still don't have connection. Please try again later. P.S: If you change your device you will lost all your stored data."
            );
          }
        });
    } else {
      sendAnswersToCloudOnFinish();
    }
  };
  return (
    <>
      <Container maxWidth="md">
        <Typography sx={styles.examQuestion}>
          {props.examInfo.mcq[questionNo].question}
        </Typography>
        <div>
          <Grid container spacing={2} justify="center">
            <FormControl component="fieldset">
              <RadioGroup aria-label="options" name="radio-buttons-group">
                <FormControlLabel
                  label={""}
                  style={{ display: "none" }}
                  control={<Radio style={styles.radioStyle} />}
                  value={0}
                />
                <FormControlLabel
                  label={props.examInfo.mcq[questionNo].answerA}
                  style={styles.optionStyle}
                  control={<Radio style={styles.radioStyle} />}
                  value={1}
                  onClick={(event) => setAnswer(event.target.value)}
                  checked={answer === "1" ? true : false}
                />
                <FormControlLabel
                  label={props.examInfo.mcq[questionNo].answerB}
                  style={styles.optionStyle}
                  control={<Radio style={styles.radioStyle} />}
                  value={2}
                  onClick={(event) => setAnswer(event.target.value)}
                  checked={answer === "2" ? true : false}
                />
                <FormControlLabel
                  label={props.examInfo.mcq[questionNo].answerC}
                  style={styles.optionStyle}
                  control={<Radio style={styles.radioStyle} />}
                  value={3}
                  onClick={(event) => setAnswer(event.target.value)}
                  checked={answer === "3" ? true : false}
                />
                <FormControlLabel
                  label={props.examInfo.mcq[questionNo].answerD}
                  style={styles.optionStyle}
                  control={<Radio style={styles.radioStyle} />}
                  value={4}
                  onClick={(event) => setAnswer(event.target.value)}
                  checked={answer === "4" ? true : false}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </div>
        <div className={classes.navButtons}>
          <Chip
            className={classes.chipStyle}
            label={questionNo + 1 + "/" + props.examInfo.mcq.length}
          />
          {(props.examInfo.mcq.length === questionNo + 1) === true ? (
            <Chip
              className={classes.chipNextStyle}
              onClick={() => finishExam()}
              label="Finish"
            />
          ) : (
            <Chip
              className={classes.chipNextStyle}
              onClick={() => nextQuestion()}
              label="Next"
            />
          )}
          <Chip className={classes.chipStyle} label={seconds} />
        </div>
      </Container>
    </>
  );
};
const styles = {
  examQuestion: {
    mt: 2,
    mb: 1,
    color: "#E3E4E5",
    textAlign: "left",
    fontSize: 20,
    marginBottom: 3,
  },
  optionStyle: {
    borderWidth: 1,
    borderColor: "#E3E4E5",
    borderStyle: "solid",
    borderRadius: 5,
    width: "128vh",
    margin: 10,
  },
  radioStyle: {
    backgroundColor: "#E3E4E5",
    margin: 10,
    width: 32,
    height: 32,
    textAlign: "left",
  },
};
export default SecondStep;
