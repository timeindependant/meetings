import React from 'react'
import { MdAdd } from 'react-icons/md'

import style from './ActionButtonSimplest.module.css'

const SPACING = 20

export default function ActionButtonSimplest (props) {
  const { size } = props

  return (
    <div
      className={style.container}
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      <MdAdd
        size={size - SPACING}
        color={'white'}
        className={style.icon}
      />
    </div>
  )
}
