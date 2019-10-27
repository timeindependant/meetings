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
      main: '#FC1A45'
    },
    notification: {
      main: '#FC1A45'
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
  }
})

export default theme
