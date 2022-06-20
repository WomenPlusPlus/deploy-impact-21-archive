import * as React from "react";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import createRoutes from "./components/Routes";
import { darkTheme } from "./themes/dark";

const darkModeTheme = createTheme(darkTheme);

function App() {
  const styles = {
    div: {
      backgroundColor: "#20222B",
    },
  };
  useTheme();
  return (
    <ThemeProvider theme={darkModeTheme}>
      <div className="App" style={styles.div}>
        {createRoutes()}
      </div>
    </ThemeProvider>
  );
}

export default App;

// export default function DarkThemeWithCustomPalette() {
//   return (

//       <MyApp />

//   );
// }
