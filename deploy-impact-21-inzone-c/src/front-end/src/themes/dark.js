import { createTheme } from "@material-ui/core";
import { red } from "@mui/material/colors";

const font = "'Open Sans', sans-serif;'"

export const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#2A2A2A',
            light: 'rgb(81, 91, 95)',
            dark: 'rgb(26, 35, 39)',
            contrastText: '#ffffff',
            background: {
                default: '#3D3D3D'
            },
        },
        secondary: {
            main: '#F8BE48',
            light: 'rgb(255, 197, 112)',
            dark: 'rgb(200, 147, 89)',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        titleBar: {
            main: '#2B2E39',
            contrastText: '#FFFFFF',
        },
        error: {
            main: red.A400,
        },
        typography: {
            fontFamily: "'Open Sans', sans-serif"
        }
    },
});