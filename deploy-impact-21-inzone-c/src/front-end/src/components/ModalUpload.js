import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Box, Modal, Button } from "@mui/material";
import * as XLSX from "xlsx";

const ModalUpload = (props) => {
  const { modalIsOpen, closeModal, examId } = props;
  const [mcQuestions, setMCQuestions] = useState();
  const importExcel = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const bstr = event.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const worksheetname = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[worksheetname];
      const data = XLSX.utils.sheet_to_csv(firstSheet);
      let splitedData = data.split(",");
      let lastArray = [];
      splitedData.map((item) => {
        if (item !== "") {
          lastArray.push(item);
        }
      });
      try {
        let questionCount = 0;
        let questions = [];
        lastArray.map((value, index) => {
          questionCount = index % 15;
          if(index === 0){
            let question = {
              question: lastArray[index],
              frenchQuestion: lastArray[index+1],
              arabicQuestion: lastArray[index+2],
              answerA: lastArray[index+3],
              frenchAnswerA: lastArray[index+4],
              arabicAnswerA: lastArray[index+5],
              answerB: lastArray[index+6],
              frenchAnswerB: lastArray[index+7],
              arabicAnswerB: lastArray[index+8],
              answerC: lastArray[index+9],
              frenchAnswerC: lastArray[index+10],
              arabicAnswerC: lastArray[index+11],
              answerD: lastArray[index+12],
              frenchAnswerD: lastArray[index+13],
              arabicAnswerD: lastArray[index+14],
              trueAnswer: parseInt(lastArray[index+15].split(/\r?\n/)[0]),
            };
            questions.push(question)
          }else if(index !== 0 && !(index % 15)){
            let question = {
              question: lastArray[index].split(/\r?\n/)[1],
              frenchQuestion: lastArray[index+1],
              arabicQuestion: lastArray[index+2],
              answerA: lastArray[index+3],
              frenchAnswerA: lastArray[index+4],
              arabicAnswerA: lastArray[index+5],
              answerB: lastArray[index+6],
              frenchAnswerB: lastArray[index+7],
              arabicAnswerB: lastArray[index+8],
              answerC: lastArray[index+9],
              frenchAnswerC: lastArray[index+10],
              arabicAnswerC: lastArray[index+11],
              answerD: lastArray[index+12],
              frenchAnswerD: lastArray[index+13],
              arabicAnswerD: lastArray[index+14],
              trueAnswer: parseInt(lastArray[index+15].split(/\r?\n/)[0]),
            };
            questions.push(question)
          }
          setMCQuestions(questions)
        })
      } catch (e) {
        //do nothing
      }
    };
    fileReader.readAsBinaryString(file);
  };
  const onImportExcel = (event) => {
    const { files } = event.target;
    if (files.length === 1) {
      importExcel(files[0]);
    }
  };
  const saveMCQs = () => {
    mcQuestions.map((question) => {
      let _data = {
        ...question,
        examId: {
          __type: "Pointer",
          className: "Exam",
          objectId: examId,
        },
      };
      fetch(
        "https://inzone-c-parse.tools.deployimpact.ch/parse/classes/MultipleChoiceQuestion",
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
        .then((json) => console.log('json: ', json))
        .catch((err) => console.log(err));
    })
    closeModal(true, mcQuestions)
  }
  return (
    <Modal open={modalIsOpen} onClose={() => closeModal(true)}>
      <Box sx={styles.styleOfModal}>
        <Typography style={styles.modalTitle}>
          Upload the *.csv file here
        </Typography>
        <Button
          style={{
            marginTop: 20,
            backgroundColor: "#2B2E39",
            border: "2px solid #E3E4E5",
          }}
        >
          <input
            style={{ margin: 20, textAlign: "center", color: "#E3E4E5" }}
            type="file"
            onChange={onImportExcel}
          />
        </Button>
        <Button
          style={{
            marginTop: 20,
            backgroundColor: "#2B2E39",
            border: "2px solid #E3E4E5",
          }}
        >
          <a
            href="/MCQTemplate.csv"
            style={{ color: "#E3E4E5", textDecoration: "none" }}
            download
          >
            Download exam template
          </a>
        </Button>
        <Button
          variant="contained"
          color="success"
          style={styles.nextButton}
          onClick={() => saveMCQs()}
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#E3E4E5",
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

export default ModalUpload;
