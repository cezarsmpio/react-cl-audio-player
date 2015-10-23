# CLAudioPlayer

A simple audio player with ReactJS and CSS3.

Inspiration: [Thanks Rovane Durso](https://dribbble.com/shots/998479-Music)

## TODO

* ~~shuffle~~
* ~~mute/unmute~~
* ~~repeat song~~
* ~~cover~~
* ~~play/pause song~~
* ~~prev/next song~~
* Drag n Drop of the songs
* Better volume control


## Demo & Examples

Live demo: [CezarLuiz0.github.io/react-cl-audio-player](http://CezarLuiz0.github.io/react-cl-audio-player/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-cl-audio-player is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-cl-audio-player.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-cl-audio-player --save
```


## Usage

To use, just call the CLAudioPlayer instance and render it.

```
var CLAudioPlayer = require('react-cl-audio-player');

<CLAudioPlayer songs={songs} autoplay />
```

### Properties

* songs - An array with the object songs - required
* * url - string
* * cover - string - optional
* * artist - object
* * * name - string
* * * song - string
* autoplay - Is autoplay?

Songs model:

```
var songs = [
  {
    url: 'path/to/mp3',
    cover: 'path/to/jpeg',
    artist: {
      name: 'Metallica',
      song: 'Fuel'
    }
  },
  {
    url: 'path/to/your/mp3',
    artist: {
      name: 'X Japan',
      song: 'Art of Life'
    }
  }
];

// Just call
<CLAudioPlayer songs={songs} autoplay />
```

#### CSS classes
* .no-height - A helper class for songs without covers
* .player-container
* .player-cover
* .artist-info
* .artist-name
* .artist-song-name
* .player-progress-container
* .player-progress-value
* .player-options
* .player-buttons
* .player-btn
* .player-btn i (.fa .fa-play .fa-pause .fa-volume .fa-volume-off .fa-forward .fa-backward .fa-repeat .fa-random)
* .player-btn.big.medium.small.active.volume:disabled
* .player-controls



### Notes

Works perfectly in Chrome, Firefox and Safari. No test in IE.


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

MIT License.

Copyright (c) 2015 Cezar Luiz.

