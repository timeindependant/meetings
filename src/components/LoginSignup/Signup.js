import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Input from './Input'
import Info from './Info'

import { requestLoginLink } from '../../state/session/actions'

import style from './Login.module.css'

class SignUp extends React.Component {
  handleSubmit = (value) => {
    const { session } = this.props
    if (!session.loginLinkLoading && !session.loginLinkSuccess) {
      this.props.requestLoginLink(value)
    }
  }

  render () {
    const { session } = this.props
    return [
      <div
        className={style.heading}
        key='heading'
      >
        Create Account
      </div>,
      (session.loginLinkSuccess) ? (
        <Info
          key='info'
        />
      ) : (
        [
          <Input
            key='input'
            handleSubmit={this.handleSubmit}
            error={(session.loginLinkFailed) ? 'Please try again.' : undefined}
            disabled={session.loginLinkLoading}
            signup
          />,
          <div
            key='newAccount'
            className={style.newAccount}
          >
            <span className={style.newHere}>
              Already got an account?
            </span>
            <Link to={`/login`}
              className={style.createAccount}
            >
              Login.
            </Link>
          </div>
        ]
      )
    ]
  }
}

function mapStateToProps (state) {
  const { session } = state
  return { session }
}

const mapDispatchToProps = {
  requestLoginLink
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
