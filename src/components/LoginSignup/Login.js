import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Input from './Input'
import Info from './Info'

import { requestLoginLink } from '../../state/session/actions'

import style from './Login.module.css'

class Login extends React.Component {
  handleLogin = (value) => {
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
        Login
      </div>,
      (session.loginLinkSuccess) ? (
        <Info
          key='info'
        />
      ) : (
        [
          <Input
            key='input'
            handleSubmit={this.handleLogin}
            error={(session.loginLinkFailed) ? 'Please try again.' : undefined}
            disabled={session.loginLinkLoading}
          />,
          <div
            key='newAccount'
            className={style.newAccount}
          >
            <span className={style.newHere}>
              New here?
            </span>
            <Link to={`/signup`}
              href='/signup'
              className={style.createAccount}
            >
              Create an account.
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
