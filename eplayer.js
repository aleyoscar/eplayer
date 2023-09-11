class EmetPlayer {
	constructor(playerClass='.eplayer') {

		// PLAYER DIV WRAPPER
		this.player = document.createElement('div');
		this.player.classList.add('player');

		// PLAYER CONTROLS WRAPPER
		this.playerControls = document.createElement('div');
		this.playerControls.classList.add('player-controls');

		// PLAY BUTTON
		this.playerPlay = document.createElement('button');
		this.playerPlay.classList.add('player-play-btn');
		this.playerPlay.role = 'button';
		this.playerPlay.dataset.playing = 'false';

		// PLAY ICON
		this.playerIconPlay = document.createElement('div');
		this.playerIconPlay.classList.add('player-icon-play');
		this.playerIconPlay.innerHTML = '<svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>play</title><polygon class="icon-play" points="19.05 12 6 3.36 6 20.64 19.05 12"/><rect class="icon-container" width="24" height="24"/></svg>';

		// PAUSE ICON
		this.playerIconPause = document.createElement('div');
		this.playerIconPause.classList.add('player-icon-pause');
		this.playerIconPause.classList.add('player-hidden');
		this.playerIconPause.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>pause</title><g><rect  class="icon-pause" x="6" y="3.26" width="4" height="17.48"/><rect class="icon-pause" x="14" y="3.26" width="4" height="17.48"/></g><rect class="icon-container" width="24" height="24"/></svg>';

		// TIMELINE
		this.playerTimeline = document.createElement('div');
		this.playerTimeline.classList.add('player-timeline');

		// CURRENT TIME
		this.playerTimeCurrent = document.createElement('span');
		this.playerTimeCurrent.classList.add('player-time');
		this.playerTimeCurrent.classList.add('player-time-current');
		this.playerTimeCurrent.innerHTML = '00:00';

		// PLAYER PROGRESS
		this.playerProgress = document.createElement('div');
		this.playerProgress.classList.add('player-progress');

		// PLAYER PROGRESS FILLED
		this.playerProgressFilled = document.createElement('div');
		this.playerProgressFilled.classList.add('player-progress-filled');

		// DURATION
		this.playerTimeDuration = document.createElement('span');
		this.playerTimeDuration.classList.add('player-time');
		this.playerTimeDuration.classList.add('player-time-duration');
		this.playerTimeDuration.innerHTML = '00:00';

		// VOLUME CONTAINER
		this.playerVolumeContainer = document.createElement('div');
		this.playerVolumeContainer.classList.add('player-volume-container');

		// VOLUME CONTROL
		this.playerVolume = document.createElement('input');
		this.playerVolume.classList.add('player-volume');
		this.playerVolume.type = 'range';
		this.playerVolume.id = 'volume';
		this.playerVolume.min = '0';
		this.playerVolume.max = '1';
		this.playerVolume.value = '1';
		this.playerVolume.step = '0.01';

		// AUDIO SOURCE
		this.playerAudio = document.createElement('audio');

		// APPEND ELEMENTS
		this.playerVolumeContainer.appendChild(this.playerVolume);

		this.playerProgress.appendChild(this.playerProgressFilled);

		this.playerTimeline.appendChild(this.playerTimeCurrent);
		this.playerTimeline.appendChild(this.playerProgress);
		this.playerTimeline.appendChild(this.playerTimeDuration);

		this.playerPlay.appendChild(this.playerIconPlay);
		this.playerPlay.appendChild(this.playerIconPause);

		this.playerControls.appendChild(this.playerPlay);
		this.playerControls.appendChild(this.playerTimeline);
		this.playerControls.appendChild(this.playerVolumeContainer);

		this.player.appendChild(this.playerControls);
		this.player.appendChild(this.playerAudio);

		document.querySelector(playerClass).appendChild(this.player);

		this.playerContext = new AudioContext();
		this.playerTrack = this.playerContext.createMediaElementSource(this.playerAudio);

		// EVENT LISTENERS
		this.playerPlay.addEventListener("click", this.playPause);
		// Update progress bar and time values as audio plays
		this.playerAudio.addEventListener("timeupdate", () => {
			this.progressUpdate();
			this.setTimes();
		});

	}

	playPause() {
		// check if context is in suspended state (autoplay policy)
		// By default, browsers won't allow you to autoplay audio.
		// You can override by finding the AudioContext state and resuming it after a user interaction like a "click" event.
		
		if(this.playerContext.state === "suspended") {
			this.playerContext.resume();
		}
		
		// Play or pause track depending on state
		if(this.playerPlay.dataset.playing === "false") {
			this.playerAudio.play();
			this.playerPlay.dataset.playing = "true";
			this.playerIconPlay.classList.add("player-hidden");
			this.playerIconPause.classList.remove("player-hidden");
		} else if(this.playerPlay.dataset.playing === "true") {
			this.playerAudio.pause();
			this.playerPlay.dataset.playing = "false";
			this.playerIconPause.classList.add("player-hidden");
			this.playerIconPlay.classList.remove("player-hidden");
		}
	}

	#progressUpdate() {
		this.playerTimeCurrent.textContent = new Date(this.playerAudio.currentTime * 1000).toISOString().substr(11, 8);
		this.playerTimeDuration.textContent = new Date(this.playerAudio.duration * 1000).toISOString().substr(11, 8);
	}

	#setTimes() {
		const percent = (this.playerAudio.currentTime / this.playerAudio.duration) * 100;
		this.playerProgressFilled.style.flexBasis = `${percent}%`;
	}
}
