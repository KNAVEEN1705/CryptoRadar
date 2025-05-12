// src/utils/theme.js
import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark", // Use 'mode' instead of 'type' (type is deprecated)
  },
});
