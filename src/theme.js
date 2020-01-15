import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: '"Nunito", "Helvetica", sans-serif'
  },
  palette: {
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#fff'
    },
    notification: {
      main: '#fff'
    },
    error: {
      main: '#FC1A45'
    },
    background: {
      default: '#fff'
    }
  },
  breakpoints: {
    values: {
      sm: 700
    }
  },
  overrides: {
    MuiIconButton: {
      root: {
        '&$buttonDisabled': {
          color: 'white'
        }
      }
    }
  }
})

export default theme
