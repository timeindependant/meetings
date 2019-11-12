import React from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import getFileTypeExtension from '@uppy/utils/lib/getFileTypeExtension'
import { TiMediaRecord, TiMediaStop } from 'react-icons/ti'
import recImage from '../../assets/Group 1529@2x.png'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import checkIcon from '../../assets/Group 1101.png'
import trashIcon from '../../assets/Component 1@2x.png'

import style from './WebRecorder.module.css'

/* Function copied from @uppy/webcam */
function getMediaDevices () {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    return navigator.mediaDevices
  }

  const getUserMedia =
    navigator.mozGetUserMedia || navigator.webkitGetUserMedia
  if (!getUserMedia) {
    return null
  }

  return {
    getUserMedia (opts) {
      return new Promise((resolve, reject) => {
        getUserMedia.call(navigator, opts, resolve, reject)
      })
    }
  }
}

class WebRecorder extends React.Component {
  state = {
    stream: '',
    recording: false,
    finished: false,
    videoURL: '',
    recorderReady: true
  };

  constructor (props) {
    super(props)
    this.mediaDevices = getMediaDevices()
    this.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(stream => {
        this.stream = stream
        this.webcamPreview.srcObject = stream
        this.setState({
          recorderReady: true
        })
      })
      .catch(() => {
        toast.error('Your browser does not support video recording.')
      })
  }

  componentWillUnmount () {
    this.unregister()
  }

  record = () => {
    this.recorder = new MediaRecorder(this.stream)
    this.recordingChunks = []
    this.recorder.addEventListener('dataavailable', event => {
      this.recordingChunks.push(event.data)
    })

    this.recorder.start()
    this.setState({
      recording: true
    })
  };

  unregister = () => {
    this.recordingChunks = null
    this.recorder = null
    if (this.stream) {
      this.stream.getAudioTracks().forEach(track => {
        track.stop()
      })
      this.stream.getVideoTracks().forEach(track => {
        track.stop()
      })
    }
  };

  stopRecord = () => {
    const stopped = new Promise(resolve => {
      this.recorder.addEventListener('stop', () => {
        resolve()
      })
      this.recorder.stop()
    })

    stopped
      .then(() => this.getVideo())
      .then(file => {
        this.videoFile = file
        this.webcamPreview.srcObject = undefined
        this.props.recorderFinished(file)
        this.setState({
          recording: false,
          finished: true,
          videoURL: window.URL.createObjectURL(file.data)
        })
      })
      .then(
        () => {
          this.unregister()
        },
        error => {
          this.unregister()
          toast.error(error.message)
        }
      )
  };

  getVideo = () => {
    const mimeType = this.recordingChunks[0].type
    const fileExtension = getFileTypeExtension(mimeType)

    if (!fileExtension) {
      return Promise.reject(
        new Error(
          `Could not retrieve recording: Unsupported media type "${mimeType}"`
        )
      )
    }

    const name = `NoID${Date.now()}.${fileExtension}`
    const blob = new Blob(this.recordingChunks, { type: mimeType })
    const file = {
      source: 'Webcam',
      name: name,
      data: new Blob([blob], { type: mimeType }),
      type: mimeType,
      fileExtension
    }

    return Promise.resolve(file)
  };

  render () {
    const { recorderReady, recording, finished, videoURL } = this.state
    const { size, color, showControls } = this.props

    // TODO: issues with Timeline size due to required sizing of enclosing box
    const r = Math.floor(size * 0.5)

    return [
      <div
        className={style.videoContainer}
        key='video'
        style={{
          width: `${r * 2 - 8}px`,
          height: `${r * 2 - 8}px`
        }}
      >
        <video
          key='preview'
          height='100%'
          autoPlay
          muted
          className={style.video}
          loop
          ref={ref => {
            this.webcamPreview = ref
          }}
        />
      </div>,
      <div
        key='webcamPlayerContainer'
        style={{
          width: `${r * 2 - 2}px`,
          height: `${r * 2 - 2}px`
        }}
      >
        {finished && (
          <VideoPlayer
            key='webcamPlayer'
            url={videoURL}
            color={color}
            r={r}
            isSelectedPetal={showControls}
            isPetal={!showControls}
            wasSelected
            simple
            shouldUpdate
          />
        )}
      </div>,
      //    <TiMediaRecord
      //    key="recordButton"
      //    className={classNames(
      //      style.record,
      //      recording || finished ? style.recordClicked : ""
      //    )}
      //    size={`${size * 0.25}px`}
      //    fill="red"
      //    style={{
      //      margin: `-${size * 0.125}px 0 0 -${size * 0.125}px`,
      //      pointerEvents: recorderReady && !finished ? "all" : "none"
      //    }}
      //    onClick={this.record}
      //  />
      <span key='controls' className={style.controls}>
        {this.state.recording == false && this.state.finished == true ? (
          <div className={style.iconsContainer}>
            <img
              src={trashIcon}
              alt=''
              className={`${style.recordBtn}`}
              style={{
                margin: ``,
                pointerEvents: 'all',
                cursor: 'pointer',
                width: '40px',
                marginRight: '9em',
                marginTop: '-0.6em'
              }}
              onClick={() => {
                if (this.state.recording) this.record()
                else this.stopRecord()
              }}
            />
            <img
              src={checkIcon}
              alt=''
              className={`${style.recordBtn} ${style.trashIcon}`}
              style={{
                margin: `-${size * 0.125}px 0 0 -${size * 0.125}px`,
                pointerEvents: 'all',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (this.state.recording) this.record()
                else this.stopRecord()
              }}
            />
          </div>
        ) : (
          recorderReady && [
            <img
              src={recImage}
              alt=''
              className={style.recordBtn}
              style={{
                margin: `-${size * 0.125}px 0 0 -${size * 0.125}px`,
                pointerEvents: 'all',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (this.state.recording) this.record()
                else this.stopRecord()
              }}
            />
          ]
        )}
      </span>
    ]
  }
}

export default WebRecorder
