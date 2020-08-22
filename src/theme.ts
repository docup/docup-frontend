import { createMuiTheme } from '@material-ui/core/styles';

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffff8b',
      main: '#333333',
      dark: '#c9bc1f',
      contrastText: '#ffee58',
    },
    secondary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
  },
});
