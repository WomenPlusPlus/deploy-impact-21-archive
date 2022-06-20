import React from "react";
import {
  Grid,
  Paper,
  Box,
  TextField,
  Switch,
  Button,
  FormGroup,
  FormControlLabel,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  CssBaseline
} from "@mui/material";
import { styled } from "@mui/material/styles";

const SettingsPage = () => {
  return (
    <div>
      <CssBaseline />
      <Grid sx={{
          height: '90vh'
        }} container spacing={2}>
        <Grid item xs={12}>
          <Item>
            <Box
              component="form"
              onSubmit={(values) => console.log(values)}
              noValidate
              sx={{ mt: 1, paddingLeft: "30%", paddingRight: "30%" }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="username"
                onChange={(input) => {
                }}
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                id="name"
                onChange={(input) => {
                  console.log(input);
                }}
                label="Name"
                name="name"
                autoFocus
              />
              <FormGroup>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Notifications"
                />
                <FormControlLabel control={<Switch />} label="Dark Mode" />
              </FormGroup>
              <FormControl fullWidth style={{marginTop: 15}}>
                <InputLabel id="demo-simple-select-label">App Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={"english"}
                  label="App Language"
                  onChange={(value) => console.log(value)}
                >
                  <MenuItem value={"english"}>English</MenuItem>
                  <MenuItem value={"french"}>French</MenuItem>
                  <MenuItem value={"arabic"}>Arabic</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth style={{marginTop: 15}}>
                <InputLabel id="demo-simple-select-label">Default Exam Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={"english"}
                  label="Default Exam Language"
                  onChange={(value) => console.log(value)}
                >
                  <MenuItem value={"english"}>English</MenuItem>
                  <MenuItem value={"french"}>French</MenuItem>
                  <MenuItem value={"arabic"}>Arabic</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(input) => {
                  console.log(input);
                }}
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save Settings
              </Button>
            </Box>
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
  color: theme.palette.text.primary,
}));
export default SettingsPage;
