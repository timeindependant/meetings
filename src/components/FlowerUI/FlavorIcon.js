import React from 'react'

import style from './FlavorIcon.module.css'

export default function FlavorIcon (props) {
  return (
    <img src={props.icon} style={props.style} className={style.icon} />
  )
}
