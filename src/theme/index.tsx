import { createMuiTheme, colors } from '@material-ui/core';
import ShadowValues from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  // breakpoints: {
  //   values: {
  //     xs: 0,
  //     sm: 576,
  //     md: 768,
  //     lg: 992,
  //     xl: 1200,
  //   },
  // },
  palette: {
    background: {
      default: "#F4F6F8",
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[500],
      contrastText: "#FFFFFF" 
    },
    secondary: {
      main: colors.orange[500],
      contrastText: "#FFFFFF" 
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[500]
    }
  },
  shadows : ShadowValues,
  typography : typography
});

export default theme;
