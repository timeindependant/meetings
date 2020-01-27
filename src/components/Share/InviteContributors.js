import React from 'react'
import { connect } from 'react-redux'
import { MdClose } from 'react-icons/md'

import style from './InviteContributors.module.css'

const link = 'not available yet'

function InviteContributors (props) {
  let linkText = null
  const [collapsed, setCollapsed] = React.useState(true)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    linkText.select()
  }, [])

  const copyToClipboard = () => {
    setCopied(true)
    linkText.select()
    linkText.setSelectionRange(0, 99999)
    document.execCommand('copy')
  }

  return (
    <div className={style.container}>
      <div
        className={style.button}
        onClick={() => { setCollapsed(false) }}
      >
        <img
          src='/icons/invite_people.svg'
          className={style.inviteIcon}
        />
      </div>
      <div
        className={`${style.overlay} ${(collapsed) ? style.hidden : ''}`}
        onClick={() => { setCollapsed(true) }}
        style={{
          display: (collapsed) ? 'none' : 'block'
        }}
      />
      <div
        className={style.window}
        style={{
          display: (collapsed) ? 'none' : 'block'
        }}
      >
        <MdClose
          className={style.close}
          size={25}
          color={'#AEAEB3'}
          onClick={() => { setCollapsed(true) }}
        />
        <h2>Invite People</h2>
        <p>
          Share this link with people you want to contribute to your flower.
        </p>
        <div className={style.linkContainer}>
          <textarea
            className={style.link}
            value={link}
            ref={(ref) => { linkText = ref }}
            readOnly
          />
        </div>
        <div
          className={style.copy}
          onClick={copyToClipboard}
        >
          <div>
            {(copied) ? 'copied' : 'copy link'}
          </div>
        </div>
      </div>
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
