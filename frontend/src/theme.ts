import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007BFF", // Blue theme
    },
    secondary: {
      main: "#6C757D", // Grey theme
    },
    background: {
      default: "#F8F9FA",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default theme;
