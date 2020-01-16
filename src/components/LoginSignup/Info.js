import React from 'react'
import style from './Login.module.css'

import { MdDone } from 'react-icons/md'

export default function Info ({ icon, text1, text2 }) {
  return (
    <div className={style.info}>
      <MdDone
        size='50'
        className={style.check}
      />
      <p className={style.infoText}>
        We have sent a link on your email.
        <br />
        Please use it for login.
      </p>
      <div className={style.thankyou}>Thank You!</div>
    </div>
  )
}
