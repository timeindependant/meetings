import React from 'react'
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'
import ReactPlayer from 'react-player'

import Controls from './Controls'
import FullscreenControls from './FullscreenControls'

import style from './VideoPlayer.module.css'

class VideoPlayer extends React.Component {
  state = {
    playing: false,
    isFullscreen: false,
    progress: 0,
    played: 0,
    loaded: 0,
    playedSeconds: 0
  }

  componentDidMount () {
    screenfull.on('change', () => {
      this.setState({
        isFullscreen: screenfull.isFullscreen
      })
    })
    this.updateTime()
  }

  componentDidUpdate () {
    const { isSelectedPetal } = this.props
    const { playing } = this.state
    if (!isSelectedPetal && playing) {
      this.setState({
        playing: false
      })
    }
  }

  componentWillUnmount () {
    screenfull.off()
  }

  onStart = () => {
    this.setState({
      playing: true
    })
  }

  togglePlay = () => {
    this.setState({
      playing: !this.state.playing
    })
  }

  toggleFullscreen = () => {
    if (screenfull.enabled) {
      screenfull.toggle(findDOMNode(this.fullscreenContainer))
    }
  }

  onProgress = e => {
    this.setState({
      loaded: e.loaded,
      played: e.played,
      playedSeconds: e.playedSeconds
    })
  }

  onDuration = duration => {
    this.setState({
      duration
    })
  }

  seekTo = amount => {
    if (this.player) {
      this.player.seekTo(parseFloat(amount))
      this.setState({
        played: this.player.getCurrentTime() / this.player.getDuration(),
        playedSeconds: this.player.getCurrentTime()
      })
    }
  }

  onEnded = () => {
    this.setState({
      playing: false
    })
  }

  updateTime = () => {
    if (this.props.shouldUpdate && this.player) {
      const progress = this.player.getCurrentTime() / this.player.getDuration()
      if (progress !== this.state.progress) {
        const time = this.player.getCurrentTime()
        this.setState({
          played: progress,
          playedSeconds: time
        })
        if (this.props.setCurrentTime) {
          this.props.setCurrentTime(time, progress)
        }
      }
    }

    window.requestAnimationFrame(this.updateTime)
  }

  render () {
    const { playing, isFullscreen, played, loaded, playedSeconds, duration } = this.state
    const { color, r, url, loop, start, end, simple, isPetal, isSelectedPetal, wasSelected } = this.props

    return [
      <div
        key='fullscreenContainer'
        ref={(ref) => { this.fullscreenContainer = ref }}
        className={style.fullscreenContainer}
        style={{
          borderRadius: (!isFullscreen) ? '50%' : 0,
          pointerEvents: (isFullscreen) ? 'all' : 'none'
        }}
      >
        {(isSelectedPetal || wasSelected || !isPetal) &&
        <ReactPlayer
          key='player'
          url={url}
          ref={(ref) => { this.player = ref }}
          playing={playing}
          onDuration={this.onDuration}
          loop={loop}
          controls={isFullscreen}
          config={{
            youtube: {
              playerVars: {
                autoplay: 0,
                controls: (isFullscreen) ? 1 : 0,
                cc_load_policy: 0,
                fs: 1,
                iv_load_policy: 3,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                playsinline: 1,
                allowfullscreen: 1,
                frameborder: 0,
                start,
                end
              }
            }
          }}
          onEnded={this.onEnded}
          height={(!isFullscreen) ? '100%' : '100%'}
          width={(!isFullscreen) ? 'auto' : '100%'}
          className={style.video}
          onStart={this.onStart}
        />
        }
        {isFullscreen && false &&
        <FullscreenControls
          key='fullscreenControls'
          playing={playing}
          color={color}
          r={r}
          clickPlay={this.togglePlay}
          toggleFullscreen={this.toggleFullscreen}
          played={played}
          loaded={loaded}
          seekTo={this.seekTo}
        />
        }
      </div>,
      <div key='controlsContainer'>
        {(isSelectedPetal || !isPetal) &&
        <Controls
          key='controls'
          playing={playing}
          color={color}
          r={r}
          clickPlay={this.togglePlay}
          toggleFullscreen={this.toggleFullscreen}
          played={played}
          playedSeconds={playedSeconds}
          loaded={loaded}
          seekTo={this.seekTo}
          duration={duration}
          simple={simple}
          isPetal={isPetal}
        />
        }
      </div>
    ]
  }
}

VideoPlayer.defaultProps = {
  simple: false,
  isPetal: false
}

export default VideoPlayer
