import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#C0007A",
    },
    text: {
      primary: "#100F0F",
      secondary: "#0F3D3E",
    },
    background: {
      default: "#e1e1e1",
    },
  },
  divider: {
    background: "#00000",
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 400,
    },
    
    button: {
      fontWeight: 400,
    },
  },
});

export default theme;
