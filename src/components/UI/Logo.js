import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import style from './Logo.module.css'

class Logo extends React.Component {
  constructor (props) {
    super(props)
    this.mediaQuery = window.matchMedia(`(max-width: ${props.shortenAtWidthOf}px)`)
    this.state = {
      short: this.mediaQuery.matches
    }
  }

  componentDidMount () {
    this.mediaQuery.addListener(this.queryChanged)
  }

  componentWillUnmount () {
    this.mediaQuery.removeListener(this.queryChanged)
  }

  queryChanged = (e) => {
    this.setState({
      short: e.matches
    })
  }
  render () {
    const { height, center, dark, justLettering } = this.props
    const { short } = this.state
    return (
      <Link to={`/`}>
        <div
          className={style.logoContainer}
          style={{
            margin: (center) ? 'auto' : '',
            height: height
          }}
        >
          {
            !justLettering &&
            <img
              src='/images/timz_logo.png'
              alt='Timz Logo'
              height='90%'
              style={{
                marginRight: `${height * 0.4}px`
              }}
            />
          }
          {(!short || justLettering) &&
          <img
            src={`/images/timz_font_solo_${(dark) ? 'dark' : 'light'}.svg`}
            alt='Timz Lettering'
            height='100%'
          />
          }
        </div>
      </Link>
    )
  }
}

Logo.defaultProps = {
  height: 25,
  short: false,
  dark: false,
  justLettering: false,
  shortenAtWidthOf: 0
}

Logo.propTypes = {
  height: PropTypes.number,
  short: PropTypes.bool
}

export default Logo
