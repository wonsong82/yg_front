import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import shuffle from 'shuffle-array';

class ReactMusicPlayer extends Component {

  constructor(props){
    super(props)
    this.state = {
      active: this.props.songs[0],
      current: 0,
      progress: 0,
      random: false,
      repeat: false,
      mute: false,
      play: this.props.autoplay || false,
      songs: this.props.songs,
      duration: '00:00',
      currentTime: '00:00'
    }
  }



  componentDidMount() {
    let playerElement = this.refs.player;
    playerElement.addEventListener('timeupdate', this.updateProgress.bind(this));
    playerElement.addEventListener('ended', this.end.bind(this));
    // playerElement.addEventListener('error', this.next.bind(this));
    playerElement.addEventListener('error', this.onError.bind(this))
    playerElement.addEventListener('durationchange', this.updateProgress.bind(this));
  }

  componentWillUnmount() {
    let playerElement = this.refs.player;
    playerElement.removeEventListener('timeupdate', this.updateProgress.bind(this));
    playerElement.removeEventListener('ended', this.end.bind(this));
    //playerElement.removeEventListener('error', this.next.bind(this));
    playerElement.removeEventListener('error', this.onError.bind(this))
    playerElement.removeEventListener('durationchange', this.updateProgress.bind(this));
  }

  onError(){

  }

  setProgress(e) {
    let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    let width = target.clientWidth;
    let rect = target.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let duration = this.refs.player.duration || '00:00';
    let currentTime = (duration * offsetX) / width;
    let progress = (currentTime * 100) / duration;

    this.refs.player.currentTime = currentTime;
    this.setState({ progress: progress,
      duration:this.toSec(duration),
      currentTime:this.toSec(currentTime)});
    this.play();
  }

  updateProgress() {
    let duration = this.refs.player.duration || '00:00';
    let currentTime = this.refs.player.currentTime || '00:00';
    let progress = (currentTime * 100) / duration;

    this.setState({ progress: progress,
      duration:this.toSec(duration),
      currentTime:this.toSec(currentTime) });
  }

  toSec(time) {
    let min = Math.floor(time / 60)
    let sec = Math.floor(time % 60)
    min = min < 10 ? `0${min}` : `${min}`
    sec = sec < 10 ? `0${sec}` : `${sec}`
    return `${min}:${sec}`
  }

  play() {
    this.setState({ play: true });
    this.refs.player.play();
  }

  pause() {
    this.setState({ play: false });
    this.refs.player.pause();
  }

  toggle(e) {
    e.preventDefault()
    this.state.play ? this.pause() : this.play();
  }

  end() {
    (this.state.repeat) ? this.play() : this.setState({ play: false });
  }

  next() {
    var total = this.state.songs.length;
    var current = (this.state.repeat) ? this.state.current : (this.state.current < total - 1) ? this.state.current + 1 : 0;
    var active = this.state.songs[current];

    this.setState({ current: current, active: active, progress: 0 });

    this.refs.player.src = active.url;
    this.play();
  }

  previous() {
    var total = this.state.songs.length;
    var current = (this.state.current > 0) ? this.state.current - 1 : total - 1;
    var active = this.state.songs[current];

    this.setState({ current: current, active: active, progress: 0 });

    this.refs.player.src = active.url;
    this.play();
  }

  randomize() {
    var s = shuffle(this.state.songs.slice());

    this.setState({ songs: (!this.state.random) ? s : this.state.songs, random: !this.state.random });
  }

  repeat() {
    this.setState({ repeat: !this.state.repeat });
  }

  toggleMute() {
    let mute = this.state.mute;

    this.setState({ mute: !this.state.mute });
    this.refs.player.volume = (mute) ? 1 : 0;
  }

  render() {

    const { active, play, progress } = this.state;

    /*let coverClass = classnames('player-cover', {'no-height': !active.cover });
    let playPauseClass = classnames('fa', {'icon-play-arrow': !play}, {'icon-pause': play})
    let volumeClass = classnames('fa', {'fa-volume-up': !this.state.mute}, {'fa-volume-off': this.state.mute});
    let repeatClass = classnames('player-btn small repeat', {'active': this.state.repeat});
    let randomClass = classnames('player-btn small random', {'active': this.state.random });
    /*let coverStyle = active.cover ? {backgroundImage: `url(${active.cover})`} : {background:'#ccc'}*/

    let playPauseClass = classnames({'icon-play-arrow': !play}, {'icon-pause': play})

    return (
      <div className="MusicPlayer player-container">

        <audio src={active.url || ''} autoPlay={this.state.play} preload="auto" ref="player" />

        {/*<div className={coverClass} style={coverStyle}></div>

        <div className="artist-info">
          <h2 className="artist-name">{active.artist.name}</h2>
          <h3 className="artist-song-name">{active.artist.song}</h3>
        </div>

        <div className="player-progress-container" onClick={this.setProgress.bind(this)}>
          <span className="player-progress-value" style={{width: progress + '%'}} />
        </div>

         <div className="player-options">
         <div className="player-buttons player-controls">
         <button onClick={this.toggle.bind(this)} className="player-btn big" title="Play/Pause">
         <i className={playPauseClass} />
         </button>

         <button onClick={this.previous.bind(this)} className="player-btn medium" title="Previous Song">
         <i className="fa fa-backward" />
         </button>

         <button onClick={this.next.bind(this)} className="player-btn medium" title="Next Song">
         <i className="fa fa-forward" />
         </button>
         </div>

         <div className="player-buttons">
         <button className="player-btn small volume" onClick={this.toggleMute.bind(this)} title="Mute/Unmute">
         <i className={volumeClass} />
         </button>

         <button className={repeatClass} onClick={this.repeat.bind(this)} title="Repeat">
         <i className="fa fa-repeat" />
         </button>

         <button className={randomClass} onClick={this.randomize.bind(this)} title="Shuffle">
         <i className="fa fa-random" />
         </button>
         </div>

         </div>
         */}

        <div className="music-info">
          <div className="order">{this.props.orderID}</div>
          <div className="info">
            <h3 className="title">{active.artist.song}</h3>
            <span className="subtitle">{active.artist.sub}</span>
            <div className="song">
              <span className="artist-name">{active.artist.name}</span>
              <span className="current-time"> {this.state.play && this.state.currentTime} / {this.state.duration}</span>
            </div>
          </div>
        </div>

        <div className="controls">
          <a href="#" onClick={this.toggle.bind(this)} className="player-btn" title="Play/Pause">
            <span className={playPauseClass} />
          </a>
        </div>

        <div className="progress-container" onClick={this.setProgress.bind(this)}>
          <span className="progress-value" style={{width: progress + '%'}} />
        </div>




      </div>
    );
  }
}

ReactMusicPlayer.propTypes = {
  autoplay: PropTypes.bool,
  songs: PropTypes.array.isRequired
};

export default ReactMusicPlayer;
