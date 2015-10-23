var React = require('react');
var ReactDOM = require('react-dom');
var classnames = require('classnames');
var shuffle = require('shuffle-array');

var CLAudioPlayer = React.createClass({

  propTypes: {
    songs: React.PropTypes.array.isRequired,
    autoplay: React.PropTypes.bool
  },

  getInitialState() {
    return {
      active: this.props.songs[0],
      songs: this.props.songs,
      current: 0,
      progress: 0,
      random: false,
      playing: !!this.props.autoplay,
      repeat: false,
      mute: false
    }
  },

  componentDidMount() {
    var self = this;
    self.audio = document.createElement('audio');
    self.audio.src = self.state.active.url;
    self.audio.autoplay = !!this.props.autoplay;

    this.audio.addEventListener('timeupdate', self.updateProgress);
    this.audio.addEventListener('ended', self.next);
    this.audio.addEventListener('error', self.next);
  },

  updateProgress() {
    var duration = this.audio.duration;
    var currentTime = this.audio.currentTime;
    var progress = (currentTime * 100) / duration;

    this.setState({
      progress: progress
    });
  },

  setProgress(e) {
    var target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    var width = target.clientWidth;
    var rect = target.getBoundingClientRect();
    var offsetX = e.clientX - rect.left;
    var duration = this.audio.duration;
    var currentTime = (duration * offsetX) / width;
    var progress = (currentTime * 100) / duration;

    this.audio.currentTime = currentTime;

    this.setState({
      progress: progress
    });

    this.play();
  },

  play() {
    this.setState({
      playing: true
    });

    this.audio.play();
  },

  pause() {
    this.setState({
      playing: false
    });

    this.audio.pause();
  },

  toggle() {
    (this.state.playing) ? this.pause() : this.play();
  },

  next() {
    var total = this.state.songs.length;
    var current = (this.state.repeat) ? this.state.current : (this.state.current < total - 1) ? this.state.current + 1 : 0;
    var active = this.state.songs[current];

    this.setState({
      current: current,
      active: active,
      progress: 0,
      repeat: false
    });

    this.audio.src = active.url;
    this.play();
  },

  previous() {
    var total = this.state.songs.length;
    var current = (this.state.current > 0) ? this.state.current - 1 : total - 1;
    var active = this.state.songs[current];

    this.setState({
      current: current,
      active: active,
      progress: 0
    });

    this.audio.src = active.url
    this.play();
  },

  randomize() {
    var s = shuffle(this.props.songs.slice());

    this.setState({
      songs: (!this.state.random) ? s : this.props.songs,
      random: !this.state.random
    });
  },

  repeat() {
    this.setState({
      repeat: !this.state.repeat
    });
  },

  toggleMute() {
    var mute = this.state.mute;

    this.setState({
      mute: !mute
    });

    this.audio.volume = (mute) ? 1 : 0;
  },

  render() {

    var coverClass = classnames({
      'player-cover': true,
      'no-height': !!!this.state.active.cover
    });

    var playPauseClass = classnames({
      'fa': true,
      'fa-play': !this.state.playing,
      'fa-pause': this.state.playing
    });

    var volumeClass = classnames({
      'fa': true,
      'fa-volume-up': !this.state.mute,
      'fa-volume-off': this.state.mute
    });

    var randomClass = classnames({
      'player-btn small random': true,
      'active': this.state.random
    })

    var repeatClass = classnames({
      'player-btn small repeat': true,
      'active': this.state.repeat
    });

    var song = this.state.active;

		return (
      <div className="player-container">

        <div className={coverClass} style={{backgroundImage: 'url(' +  (song.cover || '') + ')'}}></div>

        <div className="artist-info">
          <h2 className="artist-name">{song.artist.name}</h2>
          <h3 className="artist-song-name">{song.artist.song}</h3>
        </div>

        <div className="player-progress-container" onClick={this.setProgress}>
          <span className="player-progress-value" style={{width: this.state.progress + '%'}}></span>
        </div>

        <div className="player-options">
          <div className="player-buttons player-controls">
            <button
              onClick={this.toggle}
              className="player-btn big"
              title="Play/Pause"
            >
              <i className={playPauseClass}></i>
            </button>
            <button
              onClick={this.previous}
              className="player-btn medium"
              title="Previous Song"
            >
              <i className="fa fa-backward"></i>
            </button>
            <button
              onClick={this.next}
              className="player-btn medium"
              title="Next Song"
            >
              <i className="fa fa-forward"></i>
            </button>
          </div>

          <div className="player-buttons">
            <button
              className="player-btn small volume"
              onClick={this.toggleMute}
              title="Mute/Unmute"
            >
              <i className={volumeClass}></i>
            </button>
            <button
              className={repeatClass}
              onClick={this.repeat}
              title="Repeat"
            >
              <i className="fa fa-repeat"></i>
            </button>
            <button
              className={randomClass}
              onClick={this.randomize}
              title="Shuffle"
            >
              <i className="fa fa-random"></i>
            </button>
          </div>
        </div>

      </div>
    );
	}

});

module.exports = CLAudioPlayer;
