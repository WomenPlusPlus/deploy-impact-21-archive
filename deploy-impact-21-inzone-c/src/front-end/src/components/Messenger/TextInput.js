import React, {useState} from "react";
import { TextField, Button } from "@mui/material";
import { Send } from "@mui/icons-material";

export const TextInput = (props) => {
  const [message, setMessage] = useState("")
  return (
    <>
      <form style={styles.form} noValidate autoComplete="off">
        <TextField
          label="Write something.."
          style={styles.textField}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button style={styles.sendButton} onClick={() => props.sendClicked(true, message)}>
          <Send />
        </Button>
      </form>
    </>
  );
};
const styles = {
  textField: {
    width: "100%",
    fontColor: "#E3E4E5",
  },
  sendButton: {
    backgroundColor: "#F8BE48",
    color: "#2B2E39",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    width: "97%",
  },
};
