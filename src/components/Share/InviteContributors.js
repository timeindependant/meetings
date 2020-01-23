import React from 'react'
import { connect } from 'react-redux'

function InviteContributors (props) {
  return (
    <div>
      Test
    </div>
  )
}

function mapStateToProps (state) {
  const { globals } = state
  return {
    globals
  }
}

export default connect(mapStateToProps)(InviteContributors)
