import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";

const primary = "#c6d1f5";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: primary,
          backgroundColor: "rgba(2, 14, 28, 1)",
          "& fieldset": {
            borderColor: "#363d54",
          },

          "&:hover fieldset": {
            borderColor: "#8795c4!important",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#8795c4!important",
          },
        },
        input: {
          "&::placeholder": {
            color: "#566185",
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
