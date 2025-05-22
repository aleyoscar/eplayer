# eplayer

ePlayer Javascript library for a custom, minimal, vanilla HTML5 Audio player

### Contents

- [Install](#install)
- [Usage](#usage)
- [Functions](#functions)
- [Customization](#customization)
- [Sources](#sources)

### Install

Download from the [releases](https://git.aleyoscar.com/emet/eplayer/releases) page, then unzip and copy eplayer.css and eplayer.js into your web directory.

### Usage

Add the stylesheet to your `<head>` element:

```
<link rel="stylesheet" href="/eplayer/eplayer.css" />
```

Specify a `<div>` element or similar with a unique class for the eplayer wrapper, the default class is `eplayer`. Place the element anywhere you would like the audio player to show. Set the `data-src` and `data-type` attribute if you would the source added when the page loads. Both are required, currently only one (1) source and only one (1) audio player are supported. Then add the `eplayer.js` script at the very end of your `<body>` tag:

```
<body>
	<!-- other html content -->
	<div class="eplayer" data-src="/sample.mp3" data-type="audio/mp3"></div>
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
const player = new EPlayer({eplayerClass: 'custom-audio-player'});
```

To change the audio source or control when the source is loaded use the `load("source", "type")` method.

```
player.load('/sample.mp3', 'audio/mp3');
```

Also see `index.html` for an example.

### Functions

| Function			| Purpose										| Example									|
| ---				| ---											| ---										|
| play()			| Starts the audio								| player.play()								|
| pause()			| Pauses the audio								| player.pause()							|
| playPause()		| Toggles the audio to play or pause			| player.playPause()						|
| stop()			| Stops the audio and sets the time to 00:00	| player.stop()								|
| load(file, type)	| Specifies a file to load with the file's type	| player.load('/sample.mp3', 'audio/mp3')	|
| seek(duration)	| Skips seconds ahead (+) or back (-)			| player.seek(-25)							|

### Customization

In order to customize the look of eplayer, simply override the root css variables in your own css file or your `<styles>` element in your html:

```
:root {
	--eplayer-background-color: #maroon;
	--eplayer-padding: 8px;
}
```

To change whether the controls are before, after, on top or below the timeline, change the `--eplayer-direction` variable to the proper flex direction. For example to place the controls below the timeline:

```
:root {
	--eplayer-direction: column-reverse;
}
```

Available variables:

| Variable									| Description									| Default			|
| ---										| ---					  						| ---				|
| *PLAYER WRAPPER VARIABLES*				| 												| 					|
| --eplayer-direction						| Player wrapper flex direction					| row				|
| --eplayer-background-color				| Player wrapper background color				| #FFFFFF			|
| --eplayer-controls-gap					| Player controls spacing between buttons		| 4px				|
| --eplayer-font							| Font for timestamp							| monospace			|
| --eplayer-font-color						| Timestamp font color							| #849294			|
| --eplayer-font-size						| Timestamp font size							| 0.8rem			|
| --eplayer-padding							| Player wrapper padding						| 12px				|
| --eplayer-primary-color					| Player primary color							| #56B6C2			|
| --eplayer-primary-color-hover				| Player primary color on hover					| #44AEBB			|
| --eplayer-primary-fill-color				| Player primary fill color for icons			| #56B6C2			|
| --eplayer-primary-fill-color-hover		| Player primary fill color for icons on hover	| #44AEBB			|
| --eplayer-radius							| Player wrapper radius	 						| 12px				|
| *PLAY BUTTON VARIABLES*					| 	   		  			 						| 					|
| --eplayer-button-background-color			| Button background color						| transparent		|
| --eplayer-button-background-color-hover	| Button background color on hover				| transparent		|
| --eplayer-button-border-radius			| Button border radius	   	  					| 12px				|
| --eplayer-button-height					| Button height 								| 36px				|
| --eplayer-button-padding					| Button padding								| 0px				|
| *SEEK BUTTON VARIABLES*					|												|					|
| --eplayer-seek-background-color			| Rewind/Forward button background color		| transparent		|
| --eplayer-seek-background-color-hover		| Rewind/Forward button background on hover		| transparent		|
| --eplayer-seek-border-radius				| Rewind/Forward button border radius			| 12px				|
| --eplayer-seek-height						| Rewind/Forward button height					| 24px				|
| --eplayer-seek-padding					| Rewind/Forward button padding					| 0px				|
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

To add your own custom icons, pass the inside of your svg icon string into the constructor with the name of the icon as the key.

```
const player = new EPlayer({
	eplayerIcons: {
		'play': '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>'
</svg>'
	}
});
```

Icon names:

| Button		| Key		|
| ---			| ---		|
| Play			| 'play'	|
| Pause			| 'pause'	|
| Rewind		| 'rewind'	|
| Fast-Forward	| 'forward'	|
| Skip Ahead	| 'ahead'	|
| Go Back		| 'back'	|

### Sources

- Sample audio by [Airwolf89](https://freesound.org/people/Airwolf89/) from [freesound.org](https://freesound.org/s/346454/)
- Icons from [Bootsrap Icons](https://icons.getbootstrap.com/)
