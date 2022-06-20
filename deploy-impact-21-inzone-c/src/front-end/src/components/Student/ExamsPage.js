import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Divider,
  Box,
  Paper,
  Grid,
  LinearProgress,
  Typography,
  CssBaseline,
} from "@mui/material";
import ExamStepHandlingComponent from "./Exams/ExamStepHandlingComponent";
import ResultFeedbackModal from "./ResultFeedbackModal";
import ExamDiv from "./ExamDiv";

const ExamsPage = () => {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState();
  const [examInfo, setExamInfo] = useState();
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [userExamInfo, setUserExamInfo] = useState([]);

  const loadExams = () => {
    // refugeeCampId of User => JSON.parse(localStorage.getItem("userInformation")).refugeeCampId.objectId
    fetch(
      `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/Exam?where={"$or":[{"examLocation":{"__type":"Pointer","className":"RefugeeCamp","objectId":"${
        JSON.parse(localStorage.getItem("userInformation")).refugeeCampId
          .objectId
      }"}},{"examLocation":null}]}&include=examLocation&include=createdBy`,
      {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "inzonec",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setExams(json.results);
      })
      .catch((err) => console.log(err));
  };

  const loadExam = (exam) => {
    let examObject = {
      examId: exam.objectId,
      secondSectionStartDate: exam.secondSectionStartDate.iso,
      firstSectionLink: exam.firstSectionLink,
      mcqTotalTime: exam.mcqTotalTime,
      mcq: {},
    };
    fetch(
      `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/UserExam?where={"$and":[{"examId":{"__type":"Pointer","className":"Exam","objectId":"${
        exam.objectId
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
          let _data = {
            examId: {
              __type: "Pointer",
              className: "Exam",
              objectId: exam.objectId,
            },
            userId: {
              __type: "Pointer",
              className: "_User",
              objectId: JSON.parse(localStorage.getItem("userInformation"))
                .objectId,
            },
          };
          fetch(
            `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/UserExam/`,
            {
              method: "POST",
              body: JSON.stringify(_data),
              headers: {
                "X-Parse-Application-Id": "inzonec",
              },
            }
          )
            .then((response) => response.json())
            .then((json) => {
              fetch(
                `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/MultipleChoiceQuestion?where={"examId":{"__type":"Pointer","className":"Exam","objectId":"${exam.objectId}"}}`,
                {
                  method: "GET",
                  headers: {
                    "X-Parse-Application-Id": "inzonec",
                  },
                }
              )
                .then((response) => response.json())
                .then((json) => {
                  let questions = [];
                  json.results.map((question) => questions.push(question));
                  examObject.mcq = questions;
                })
                .then(() => {
                  // TODO: We need to encrypt the data here.
                  localStorage.setItem("exam", JSON.stringify(examObject));
                  setExamInfo(examObject);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log("err: ", err.message));
        } else {
          fetch(
            `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/MultipleChoiceQuestion?where={"examId":{"__type":"Pointer","className":"Exam","objectId":"${exam.objectId}"}}`,
            {
              method: "GET",
              headers: {
                "X-Parse-Application-Id": "inzonec",
              },
            }
          )
            .then((response) => response.json())
            .then((json) => {
              let questions = [];
              json.results.map((question) => questions.push(question));
              examObject.mcq = questions;
            })
            .then(() => {
              // TODO: We need to encrypt the data here.
              localStorage.setItem("exam", JSON.stringify(examObject));
              setExamInfo(examObject);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadExams();
  }, []);

  const handleOpenFeedbackModal = (exam) => {
    fetch(
      `https://inzone-c-parse.tools.deployimpact.ch/parse/classes/UserExam?where={"$and":[{"examId":{"__type":"Pointer","className":"Exam","objectId":"${
        exam.objectId
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
          alert("You have not taken this exam yet.");
        } else {
          setUserExamInfo(json.results[0]);
          setOpenFeedbackModal(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCloseFeedbackModal = () => {
    setOpenFeedbackModal(false);
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid style={examInfo && { display: "none" }}>
          <Grid container spacing={0} justifyContent="center">
            <Item style={{ paddingLeft: 80, paddingRight: 80, width: "130vh" }}>
              {loading === true && <LinearProgress />}
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  marginBottom: 10,
                }}
              >
                <Typography sx={styles.headerTitle}>Exams</Typography>
                <Typography sx={styles.headerInfo}>
                  You have {exams && exams.length} exams in your dashboard.
                </Typography>
              </div>
              <Divider style={{ marginBottom: 30 }} />
              <Grid container item spacing={5}>
                {exams &&
                  exams.map((exam, index) => (
                    <ExamDiv
                      index={index}
                      examName={exam.name}
                      secondSectionStartDate={exam.secondSectionStartDate.iso}
                      loadExam={(loadTime) => loadTime && loadExam(exam)}
                      handleOpenFeedbackModal={(modalTime) =>
                        modalTime && handleOpenFeedbackModal(exam)
                      }
                    />
                  ))}
              </Grid>
            </Item>
          </Grid>
        </Grid>
        {examInfo && (
          <ExamStepHandlingComponent
            examInfo={examInfo}
            finishExam={(finishExam) => finishExam && setExamInfo(undefined)}
          />
        )}
      </Box>
      {userExamInfo && (
        <ResultFeedbackModal
          modalIsOpen={openFeedbackModal}
          userExamInfo={userExamInfo}
          closeModal={(closeTime) => closeTime && handleCloseFeedbackModal()}
        />
      )}
    </>
  );
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#2B2E39",
}));
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
  },
};
export default ExamsPage;
