import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    width: '100%',
    textAlign: 'center',
    padding: 'none'
  },
  root: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main
      }
    }
  }
}))

export default function Textfield ({ onChange, type, error, autoComplete, label }) {
  const [labelWidth, setLabelWidth] = React.useState(0)
  const [value, setValue] = React.useState('')
  const labelRef = React.useRef(null)
  const classes = useStyles()

  React.useEffect(() => {
    setLabelWidth(labelRef.current.offsetWidth)
  }, [])

  function handleChange (event) {
    setValue(event.target.value)
    onChange(event.target.value)
  }

  return (
    <div className={classes.container}>
      <FormControl
        error={error} // If the error string have some message the textfields turns red.
        margin='dense'
        className={classes.formControl}
        fullWidth
        variant='outlined'
        // className={classes.root}
      >
        <InputLabel required ref={labelRef} htmlFor='component-outlined'>
          {label}
        </InputLabel>
        <OutlinedInput
          autoComplete={autoComplete}
          fullWidth
          id='component-outlined'
          value={value}
          type={type}
          onChange={handleChange}
          labelWidth={labelWidth}
          autoFocus
        />
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </div >
  )
}
