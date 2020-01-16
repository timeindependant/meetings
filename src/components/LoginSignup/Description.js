import React from 'react'
import style from './Login.module.css'

import Logo from '../UI/Logo'

export default function Description () {
  return (
    <div className={style.description}>
      <Logo
        height={80}
        center
      />
      <p className={style.descriptionText}>
      Welcome, remoteers, to a remote world. <br />
      Enjoy the fruitful power of free collaboration.
      </p>
    </div>
  )
}
