# eplayer

ePlayer Javascript library for a custom, minimal, vanilla HTML5 Audio player

### Contents

- [Install](#install)
- [Usage](#usage)
- [Functions](#functions)
- [Customization](#customization)

### Install

Download the latest version from the [releases](https://git.aleyoscar.com/emet/eplayer/releases) page. Unzip and copy the eplayer folder into your web directory.

### Usage

Add the stylesheet to your `<head>` element:

```
<link rel="stylesheet" href="/eplayer/eplayer.css" />
```

Specify a `<div>` element or similar with a unique class for the eplayer wrapper, the default class is `eplayer`. Place the element anywhere you would like the audio player to show. Currently only one (1) audio player is supported. Then add the `eplayer.js` script at the very end of your `<body>` tag:

```
<body>

	<!-- other html content -->

	<div class="eplayer"></div>

	<!-- other html content -->

<script src="/eplayer/eplayer.js"></script>
```

Instantiate the player with the `EPlayer` class inside your javascript code after the DOM content has loaded:

```
document.addEventListener('DOMContentLoaded', (event) => {
	const player = new EPlayer();
});
```

The constructor will insert the audio element and other necessary html elements into your div. To specify a custom class for the eplayer wrapper, simply pass it into the constructor.

```
const player = new EPlayer('custom-audio-player');
```

Also see [index.html](https://git.aleyoscar.com/emet/eplayer/src/branch/main/index.html) for an example.

### Functions

| Function			| Purpose										| Example									|
| ---				| ---											| ---										|
| play()			| Starts the audio								| player.play()								|
| pause()			| Pauses the audio								| player.pause()							|
| playPause()		| Toggles the audio to play or pause			| player.playPause()						|
| stop()			| Stops the audio and sets the time to 00:00	| player.stop()								|
| load(file, type)	| Specifies a file to load with the file's type	| player.load('/sample.mp3', 'audio/mp3')	|

### Customization
