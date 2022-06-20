import { Typography, Grid, Paper, Link, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StudentHomePage = () => {
  return (
    <div>
      <CssBaseline />
      <Grid sx={{
          height: '90vh'
        }} container spacing={2}>
        <Grid item xs={12}>
          <Item style={styles.itemStyle}>
            <Typography variant="h2">
              Welcome {JSON.parse(localStorage.getItem("userInformation")).name}{" "}
              !
            </Typography>
            <Paper variant="outlined" style={styles.logoAtCenter}>
              <img width="400" src="/home-logo-sample.png" />
            </Paper>
            <Typography style={styles.text}>Let's edit your profile first!</Typography>
            <Typography style={styles.text}>
              <Link href="/student/settings" style={{color: '#E3E4E5'}}> Click Here!</Link>
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));
const styles = {
  itemStyle: {
    backgroundColor: '#2B2E39'
  },
  logoAtCenter: {
    backgroundColor: '#2B2E39',
    border: 'none'
  },
  text: {
    fontSize: 25,
    color: "#E3E4E5",
  },
}
export default StudentHomePage;
