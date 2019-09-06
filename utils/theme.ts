/* global window */
import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
  palette: {
    primary: {
      ...cyan,
      light: cyan[500],
      main: cyan[700],
      dark: cyan[900],
    },
    secondary: orange,
    error: red,
  },
});

export default theme;

if (process.env.NODE_ENV !== 'production') {
  if (typeof window !== 'undefined') {
    window.theme = theme;
  }
}
