import React from "react";
import { usePageVisibility } from "react-page-visibility";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

let stop = false;

const ExamAlert = () => {
  const isVisible = usePageVisibility();
  if (!isVisible) {
    stop = true;
  }
  return (
    <div>
      <h1>Exam Session Stopped</h1>
      <Dialog open={stop}>
        <DialogTitle id="alert-dialog-title">
          {"Did you switch tab??"}
        </DialogTitle>
        <DialogContent>
          You should not swtich tab when doing exams..
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ExamAlert;
