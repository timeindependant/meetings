import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import TextField from '../UI/Textfield'

import style from './Login.module.css'

const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export default ({ handleSubmit, disabled, error, signup }) => {
  const [state, setState] = useState({
    mail: '',
    isMail: false,
    isUsername: false,
    didChange: true,
    isChecked: false
  })

  const handleChangeMail = (val) => {
    setState((prevState) => {
      return {
        ...prevState,
        mail: val,
        isMail: validateEmail(val),
        didChange: true
      }
    })
  }

  const handleChangeUsername = (val) => {
    setState((prevState) => {
      return {
        ...prevState,
        mail: val,
        isUsername: (val.length > 2),
        didChange: true
      }
    })
  }

  const handleChangeTerms = (e) => {
    const isChecked = e.target.checked
    setState((prevState) => {
      return {
        ...prevState,
        isChecked,
        didChange: true
      }
    })
  }

  const handleSubmitLocal = (e) => {
    e.preventDefault()
    handleSubmit(state.mail)
    setState((prevState) => {
      return {
        ...prevState,
        didChange: false
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmitLocal}
      className={style.form}
      autoComplete='on'
    >
      {signup &&
      <TextField
        onChange={handleChangeUsername}
        className={style.textField}
        type='name'
        autoComplete='username'
        label='Username'
      />
      }
      <TextField
        onChange={handleChangeMail}
        className={style.textField}
        type='email'
        autoComplete='email'
        label='Email Adress'
        error={(!state.didChange) ? error : undefined}
      />
      {
        signup &&
        <div className={style.terms}>
          <input
            type='checkbox'
            className={style.checkbox}
            onChange={handleChangeTerms}
          />
          <span>I agree to the </span>
          <Link
            to='/terms'
            className={style.termsLink}
          >
          Terms and Conditions
          </Link>
        </div>
      }
      <input
        disabled={!state.isMail || (signup && (!state.isUsername || !state.isChecked)) || disabled}
        className={style.submit}
        onSubmit={handleSubmitLocal}
        type='submit'
        value='Get Login Link'
      />
    </form>
  )
}
