import React, { useEffect } from "react";
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import {
  Home,
  Settings,
  Logout,
  Chat,
  Notifications,
  Assignment,
  Groups,
} from "@mui/icons-material";
import { withRouter, useHistory } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

function Navbar() {
  const history = useHistory();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("userInformation"))) {
      history.push("/login");
      window.location.reload(false);
    }
  }, []);

  return (
    <Box sx={{ pb: 7, display: "flex" }}>
      {/* app bar */}
      <AppBar style={styles.navbar} position="static">
        <Toolbar>
          <Typography
            style={styles.title}
            variant="h6"
            noWrap
            component="div"
            sx={{
              textAlign: "left",
              flexGrow: 1,
              display: { xs: "block", sm: "block" },
            }}
          >
            Examify
          </Typography>
          {/* <IconButton
            style={styles.navIcon}>
            <ThemeSwitch />
          </IconButton> */}
          <IconButton
            style={styles.navIcon}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() =>
              JSON.parse(localStorage.getItem("userInformation")).role ===
              "student"
                ? history.push("/student")
                : history.push("/coordinator")
            }
          >
            <Home />
            Home
          </IconButton>
          <IconButton
            style={styles.navIcon}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() =>
              JSON.parse(localStorage.getItem("userInformation")).role ===
              "student"
                ? history.push("/student/notifications")
                : history.push("/coordinator/notifications")
            }
          >
            <Notifications />
            Notifications
          </IconButton>
          <IconButton
            style={styles.navIcon}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() =>
              JSON.parse(localStorage.getItem("userInformation")).role ===
              "student"
                ? history.push("/student/chat")
                : history.push("/coordinator/chat")
            }
          >
            <Chat />
            Chat
          </IconButton>
          <IconButton
            style={styles.navIcon}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() =>
              JSON.parse(localStorage.getItem("userInformation")).role ===
              "student"
                ? history.push("/student/exams")
                : history.push("/coordinator/students")
            }
          >
            {JSON.parse(localStorage.getItem("userInformation")).role ===
            "student" ? (
              <Assignment />
            ) : (
              <Groups />
            )}
            {JSON.parse(localStorage.getItem("userInformation")).role ===
            "student"
              ? "Exams"
              : "Students"}
          </IconButton>
          {JSON.parse(localStorage.getItem("userInformation")).role ===
          "student" ? null : (
            <IconButton
              style={styles.navIcon}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() =>
                JSON.parse(localStorage.getItem("userInformation")).role ===
                "student"
                  ? history.push("/student/exams")
                  : history.push("/coordinator/exams")
              }
            >
              <Assignment />
              Exams
            </IconButton>
          )}
          <IconButton
            style={styles.navIcon}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() =>
              JSON.parse(localStorage.getItem("userInformation")).role ===
              "student"
                ? history.push("/student/settings")
                : history.push("/coordinator/settings")
            }
          >
            <Settings />
            Settings
          </IconButton>
          <IconButton
            style={styles.logOutIcon}
            size="large"
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              localStorage.removeItem("userInformation");
              history.push("/login");
              window.location.reload(false);
            }}
          >
            <Logout />
            Logout
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
const styles = {
  navbar: {
    backgroundColor: "#2B2E39",
  },
  navIcon: {
    marginRight: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontSize: 12,
    margin: 10,
  },
  logOutIcon: {
    marginRight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontSize: 12,
    margin: 10,
  },
  title: {
    marginLeft: 200,
    fontWeight: 700,
  },
};
export default withRouter(Navbar);
