import React from 'react'
import { connect } from 'react-redux'
import { MdAdd } from 'react-icons/md'

import { startNodeRoutine, stopNodeRoutine } from '../../state/globals/actions'
import { NODE_TYPES } from '../../state/globals/defaults'

import style from './ActionButton.module.css'

const SPACING = 20

function ActionButton (props) {
  const { size, startNodeRoutine, stopNodeRoutine, globals } = props

  return [
    <div
      key='button'
      className={style.container}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`
        }}
        className={style.bigBG}
        onClick={() => {
          startNodeRoutine(NODE_TYPES.LINK_NODE)
        }}
      />
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `scale(${(globals.addNodeRoutineRunning) ? 1 : 0})`
        }}
        className={style.smallBG}
        onClick={() => {
          stopNodeRoutine()
        }
        }
      />
      <MdAdd
        style={{
          transform: `rotate(${(globals.addNodeRoutineRunning) ? 45 : 0}deg)`
        }}
        size={size - SPACING}
        color={'white'}
        className={style.abort}
      />
      <MdAdd
        style={{
          transform: `rotate(${(globals.addNodeRoutineRunning) ? 45 : 0}deg)`,
          opacity: (globals.addNodeRoutineRunning) ? 1 : 0
        }}
        size={size - SPACING}
        color={'#222642'}
        className={style.abort}
      />
    </div>
  ]
}

function mapStateToProps (state) {
  const { globals } = state
  return {
    globals
  }
}
const mapDispatchToProps = {
  startNodeRoutine, stopNodeRoutine
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton)
