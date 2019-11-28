import React from 'react'

export default class Test extends React.Component {
  state = {
    payload: ''
  }

  componentDidMount () {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/uploadLink`,
      {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          videoFile: {
            size: 13000
          }
        })
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({ payload: response.upload.form })
      })
  }

  render () {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.payload }}>
        {/* {this.state.payload} */}
      </div>
    )
  }
}
