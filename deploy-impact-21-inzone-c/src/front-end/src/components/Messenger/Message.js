import React from "react";

export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const displayName = props.displayName ? props.displayName : "Student";
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <div style={styles.displayName}>{displayName}</div>
          <div style={styles.leftMessageBigDiv}>
            <div>
              <p style={styles.messageP}>{message}</p>
            </div>
            <div style={styles.timestampDiv}>{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export const MessageRight = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={styles.messageRightBigDiv}>
        <p style={styles.messageP}>{message}</p>
        <div
          style={styles.timestampDiv}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
};

const styles = {
  displayName: {
    color: "#E3E4E5",
  },
  leftMessageBigDiv: {
    position: "relative",
    marginLeft: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#2B2239",
    width: "60%",
    textAlign: "left",
    color: "#E3E4E5",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #97C6E3",
    borderRadius: "10px",
  },
  messageP: {
    padding: 0,
    margin: 0,
  },
  timestampDiv: {
    position: "absolute",
    fontSize: ".85em",
    fontWeight: "300",
    color: "#E3E4E5",
    bottom: "3px",
    right: "8px",
  },
  messageRightBigDiv: {
    position: "relative",
    marginRight: "20px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#2B2239",
    color: "#E3E4E5",
    width: "60%",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #F8BE4A",
    borderRadius: "10px",
  },
};
