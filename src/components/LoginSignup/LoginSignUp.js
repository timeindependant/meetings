import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { requestLoginLink } from '../../state/session/actions'

import style from './Login.module.css'

import Description from './Description'
import Login from './Login'
import SignUp from './Signup'

class LoginSignUp extends React.Component {
  render () {
    const { signUp } = this.props
    return (
      <div className={style.backgroundContainer}>
        <div className={style.container}>
          <Grid container className={style.mainGrid}>
            <Grid item xs={12} sm={6} className={style.section}>
              <Description />
            </Grid>
            <Grid item xs={12} sm={6} className={style.section}>
              <Paper
                className={style.paper}
                children={
                  (signUp) ? <SignUp /> : <Login />
                } />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

LoginSignUp.defaultProps = {
  signUp: false
}

function mapStateToProps (state) {
  const { session } = state
  return { session }
}

const mapDispatchToProps = {
  requestLoginLink
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignUp)
