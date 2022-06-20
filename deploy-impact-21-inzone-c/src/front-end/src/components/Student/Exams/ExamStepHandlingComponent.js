import React, { useState } from "react";
import {
  Typography,
  Box,
  Divider,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CssBaseline,
  Button,
  TextField,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExamComponent from "./ExamComponent";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import { Battery30, Battery60, BatteryFull } from "@mui/icons-material";

const steps = [
  {
    label: "Enter",
  },
  {
    label: "Rules",
  },
  {
    label: "Start",
  },
];

const ExamStepHandlingComponent = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [closeExamComponent, setCloseExamComponent] = useState(false);
  const [openSecondStep, setOpenSecondStep] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={styles.bigBox}>
      <Grid container spacing={2}>
        {closeExamComponent === false ? (
          <>
            <Grid item xs={12}>
              <Item>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  orientation="horizontal"
                >
                  {steps.map((step, index) => {
                    if (index === 0) {
                      return (
                        <Step key={step.label} style={{ color: "#E3E4E5" }}>
                          <StepLabel StepIconComponent={Battery30}>
                            <Typography gutterBottom style={styles.stepLabel}>
                              {step.label}
                            </Typography>
                          </StepLabel>
                        </Step>
                      );
                    } else if (index === 1) {
                      return (
                        <Step key={step.label} style={{ color: "#E3E4E5" }}>
                          <StepLabel StepIconComponent={Battery60}>
                            <Typography style={styles.stepLabel} gutterBottom>
                              {step.label}
                            </Typography>
                          </StepLabel>
                        </Step>
                      );
                    } else if (index === 2) {
                      return (
                        <Step key={step.label} style={{ color: "#E3E4E5" }}>
                          <StepLabel StepIconComponent={BatteryFull}>
                            <Typography style={styles.stepLabel} gutterBottom>
                              {step.label}
                            </Typography>
                          </StepLabel>
                        </Step>
                      );
                    }
                  })}
                </Stepper>
                {activeStep === 0 ? (
                  <div style={{ position: "relative" }}>
                    <div style={styles.stepOneDiv}>
                      <Typography style={styles.stepOneHeadText} gutterBottom>
                        Personal Details
                      </Typography>
                      <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box sx={styles.stepOneInputsBox}>
                          <Box
                            component="form"
                            noValidate
                            style={{ margin: 5 }}
                          >
                            {["1", "2", "3", "4"].map(() => (
                              <TextField
                                margin="normal"
                                style={styles.idInput}
                                required
                                fullWidth
                                id="input"
                                label="Input"
                                name="input"
                              />
                            ))}
                          </Box>
                          <Box component="form" noValidate>
                            {["1", "2", "3", "4"].map(() => (
                              <TextField
                                margin="normal"
                                style={styles.idInput}
                                required
                                fullWidth
                                id="email"
                                label="Input"
                                name="input"
                              />
                            ))}
                          </Box>
                        </Box>
                      </Container>
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={styles.continueButton}
                          >
                            Continue
                          </Button>
                        </div>
                      </Box>
                    </div>
                  </div>
                ) : null}
                {activeStep === 1 ? (
                  <div style={{ position: "relative" }}>
                    <div style={styles.stepTwoDiv}>
                      <Typography style={styles.stepTwoHeadText} gutterBottom>
                        Read and accept rules.
                      </Typography>
                      <Typography style={styles.ruleText} gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus eu mauris sed purus tincidunt consequat
                        sagittis ut arcu. Nullam sit amet convallis erat, et
                        hendrerit odio. Orci varius natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus.Vestibulum
                        libero dolor, laoreet at justo ac, aliquet tempor felis.
                        Orci varius natoque penatibus et magnis dis parturient
                        montes, nascetur ridiculus mus. Quisque sed bibendum
                        tellus. Cras consequat volutpat lorem, vitae tristique
                        felis pretium eu. Aliquam pulvinar iaculis
                        lobortis.Mauris in purus ante. Nunc pellentesque risus
                        id ante blandit, vel auctor odio viverra. Pellentesque
                        habitant morbi tristique senectus et netus et malesuada
                        fames ac turpis egestas. Ut eget congue lorem, eget
                        vehicula mi. Nunc nulla purus, porttitor at mauris ac,
                        finibus mattis justo.
                      </Typography>
                      <Divider />
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={styles.continueButton}
                          >
                            Accept and continue
                          </Button>
                          <Button
                            disabled={false}
                            onClick={handleBack}
                            sx={styles.backButton}
                          >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </div>
                  </div>
                ) : null}
                {activeStep === 2 ? (
                  <div style={{ position: "relative" }}>
                    <div style={styles.stepThreeDiv}>
                      <ExamComponent
                        examInfo={props.examInfo}
                        closeExamStepsTotally={(closeTime, isSecondStep) => {
                          if (isSecondStep === true && closeTime === true) {
                            setCloseExamComponent(true);
                            setOpenSecondStep(true);
                          } else if (
                            isSecondStep === false &&
                            closeTime === true
                          ) {
                            setCloseExamComponent(true);
                            setOpenSecondStep(false);
                          }
                        }}
                      />
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button onClick={handleBack} sx={styles.backButton}>
                            Back
                          </Button>
                        </div>
                      </Box>
                    </div>
                  </div>
                ) : null}
              </Item>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Item style={{paddingLeft: 150, paddingRight: 150, paddingBottom: 70}}>
                {openSecondStep === true ? (
                  <SecondStep
                    examInfo={props.examInfo}
                    finishExam={(finishExam) =>
                      finishExam && setCloseExamComponent(false)
                    }
                  />
                ) : (
                  <ThirdStep
                    examInfo={props.examInfo}
                    backExam={(backExam) => backExam && setCloseExamComponent(false)}
                    submitExam={(submitExam) => {
                      if (submitExam === true) {
                        setCloseExamComponent(false);
                        localStorage.removeItem("exam")
                        localStorage.removeItem("userAnswers")
                        props.finishExam(true);
                      }
                    }}
                  />
                )}
              </Item>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  backgroundColor: "#2B2E39",
}));
const styles = {
  bigBox: {
    flexGrow: 1,
    paddingLeft: "100px",
    paddingRight: "100px",
  },
  stepLabel: {
    fontSize: 25,
    color: "#E3E4E5",
  },
  stepOneDiv: {
    position: "absolute",
    top: 30,
    left: 300,
    backgroundColor: "#2B2E39",
    width: "50%",
  },
  stepOneInputsBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  stepOneHeadText: {
    fontSize: 20,
    color: "#E3E4E5",
    marginTop: 10,
  },
  idInput: {
    borderWidth: 1,
    borderColor: "#F8BE48",
    borderStyle: "solid",
    borderRadius: 5,
  },
  continueButton: {
    mt: 1,
    mr: 1,
    backgroundColor: "#F8BE48",
    borderRadius: 3,
    color: "#2B2E39",
    ":hover": {
      backgroundColor: "#2B2E39",
      color: "#E3E4E5",
      borderWidth: 1,
      borderColor: "#F8BE48",
      borderStyle: "solid",
      borderRadius: 3,
    },
  },
  backButton: {
    mt: 1,
    mr: 1,
    color: "#E3E4E5",
    borderWidth: 1,
    borderColor: "#F8BE48",
    borderStyle: "solid",
    borderRadius: 3,
  },
  ruleText: {
    fontSize: 15,
    color: "#E3E4E5",
    textAlign: "left",
  },
  stepTwoDiv: {
    position: "absolute",
    top: 30,
    left: 300,
    backgroundColor: "#2B2E39",
    width: "50%",
    paddingLeft: 50,
    paddingRight: 50,
  },
  stepTwoHeadText: {
    fontSize: 25,
    color: "#E3E4E5",
    marginTop: 10,
    textAlign: "left",
  },
  stepThreeDiv: {
    position: "absolute",
    top: 30,
    left: 300,
    backgroundColor: "#2B2E39",
    width: "50%",
    paddingLeft: 50,
    paddingRight: 50,
  },
};

export default ExamStepHandlingComponent;
