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

In order to customize eplayer, simply override the root css variables in your own css file or your `<styles>` element in your html:

```
:root {
	--eplayer-background-color: #maroon;
	--eplayer-padding: 8px;
}
```

Available variables:

| Variable									| Description									| Default			|
| ---										| ---					  						| ---				|
| *PLAYER WRAPPER VARIABLES*				| 												| 					|
| --eplayer-background-color				| Player wrapper background color				| #FFFFFF			|
| --eplayer-primary-color					| Player primary color							| #56B6C2			|
| --eplayer-primary-color-hover				| Player primary color on hover					| #44AEBB			|
| --eplayer-padding							| Player wrapper padding						| 12px				|
| --eplayer-font							| Font for timestamp							| monospace			|
| --eplayer-font-color						| Timestamp font color							| #849294			|
| --eplayer-font-size						| Timestamp font size							| 0.8rem			|
| --eplayer-play-background-color			| Play button background color					| transparent		|
| --eplayer-radius							| Player wrapper radius	 						| 12px				|
| *PLAY BUTTON VARIABLES*					| 	   		  			 						| 					|
| --eplayer-play-background-color-hover		| Play button background color on hover			| transparent		|
| --eplayer-play-border-radius				| Play button border radius	   	  				| 12px				|
| --eplayer-play-height						| Play button height 							| 36px				|
| --eplayer-play-padding					| Play button padding							| 0px				|
| *PROGRESS BAR*							| 	   		  									| 					|
| --eplayer-progress-background-color		| Progress bar background color					| #D6DBDB			|
| --eplayer-progress-button-color			| Progress bar button color						| #56B6C2			|
| --eplayer-progress-button-color-hover		| Progress bar button color on hover			| #44AEBB			|
| --eplayer-progress-button-border			| Progress bar button border size				| 3px				|
| --eplayer-progress-button-border-color	| Progress bar button border color				| #FFFFFF			|
| --eplayer-progress-button-height			| Progress bar button height 					| 20px				|
| --eplayer-progress-button-radius			| Progress bar button radius					| 50%				|
| --eplayer-progress-color					| Progress bar progress color					| #56D6C2			|
| --eplayer-progress-height					| Progress bar height							| 8px				|
| --eplayer-progress-radius					| Progress bar radius							| 16px				|
