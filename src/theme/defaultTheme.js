import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const primaryMainColor = "#bbded6";
const primaryLightColor = "#fff";
const primaryDarkColor = "#aeccc3";
const secondaryMainColor = "#6C63FF";
const secondaryDarkColor = "#524ab8";
const infoLightColor = '#27CBFF';
const hyperLinkColor = "#6b6664";
const indicatorOnColor = '#bbded6';
const indicatorOffColor = '#aeccc3';
const inputBorderWidth = "3px";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Open Sans,sans-serif",
      "Merienda,cursive",
      "Merienda One,cursive",
    ].join(","),
  },
  palette: {
    primary: {
      main: primaryMainColor,
      light: primaryLightColor,
      dark: primaryDarkColor,
    },
    secondary: {
      main: secondaryMainColor,
      dark: secondaryDarkColor,
    },
    info:{
      main: infoLightColor,
      light: infoLightColor,
    },
    divider:infoLightColor,
    indicatorOn: '#dc23a5',
    indicatorOff: '#1de24f',
  },
  overrides: {
    MuiCssBaseline:{
      '@global':{
        body:{
          margin:0,
        },
        ".MuiBox-root":{
          backgroundColor: primaryLightColor,
        }
      }
    },
    MuiAppBar: {
      colorPrimary:{
        backgroundColor: primaryLightColor,
      }
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: "transparent",
      },
    },
    MuiButton: {
      root: {
        borderRadius: 100,
      },
    },
    MuiStepLabel: {
      iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    MuiDialogTitle: {
      root: {
        backgroundColor: primaryMainColor,
        boxShadow: "0 2px 10px 0 #000",
      },
    },
    MuiDialogContent: {
      root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    MuiDialogActions: {
      root: {
        flex: "1 1 auto",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      },
    },
    MuiCardContent: {
      root: {
        padding: "2%",
      },
    },
    MuiCardActions: {
      root: {
        justifyContent: "center",
        padding: 0,
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: primaryDarkColor,
      },
    },
  },
});

export default responsiveFontSizes(theme);
