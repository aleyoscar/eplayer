class EPlayer {

	#player = document.createElement('div');
	#playerControls = document.createElement('div');
	#playerPlay = document.createElement('button');
	#playerIconPlay = document.createElement('div');
	#playerIconPause = document.createElement('div');
	#playerTimeline = document.createElement('div');
	#playerTimeCurrent = document.createElement('span');
	// #playerProgressContainer = document.createElement('div');
	#playerProgress = document.createElement('input');
	// #playerProgressFilled = document.createElement('div');
	// #playerProgressButton = document.createElement('div');
	#playerTimeDuration = document.createElement('span');
	// #playerVolumeContainer = document.createElement('div');
	// #playerVolume = document.createElement('input');
	#playerAudio = document.createElement('audio');
	#playerMousedown = false;

	constructor(playerClass='.eplayer') {

		// PLAYER DIV WRAPPER
		this.#player.classList.add('player');

		// PLAYER CONTROLS WRAPPER
		this.#playerControls.classList.add('player-controls');

		// PLAY BUTTON
		this.#playerPlay.classList.add('player-play-btn');
		this.#playerPlay.role = 'button';
		this.#playerPlay.dataset.playing = 'false';

		// PLAY ICON
		this.#playerIconPlay.classList.add('player-icon-play');
		this.#playerIconPlay.innerHTML = '<svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>play</title><polygon class="icon-play" fill="currentColor" points="19.05 12 6 3.36 6 20.64 19.05 12"/><rect class="icon-container" width="24" height="24"/></svg>';

		// PAUSE ICON
		this.#playerIconPause.classList.add('player-icon-pause');
		this.#playerIconPause.classList.add('player-hidden');
		this.#playerIconPause.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>pause</title><g><rect class="icon-pause" fill="currentColor" x="6" y="3.26" width="4" height="17.48"/><rect class="icon-pause" fill="currentColor" x="14" y="3.26" width="4" height="17.48"/></g><rect class="icon-container" width="24" height="24"/></svg>';

		// TIMELINE
		this.#playerTimeline.classList.add('player-timeline');

		// CURRENT TIME
		this.#playerTimeCurrent.classList.add('player-time');
		this.#playerTimeCurrent.classList.add('player-time-current');
		this.#playerTimeCurrent.textContent = '00:00';

		// PLAYER PROGRESS
		// this.#playerProgress.classList.add('player-progress');
		// this.#playerProgressFilled.classList.add('player-progress-filled');
		// this.#playerProgressButton.classList.add('player-progress-button');
		// this.#playerProgressContainer.classList.add('player-progress-container');
		this.#playerProgress.classList.add('player-progress');
		this.#playerProgress.type = 'range';
		this.#playerProgress.id = 'progress';
		this.#playerProgress.min = '0';
		this.#playerProgress.max = '100';
		this.#playerProgress.step = '1';
		this.#playerProgress.value = '0';

		// DURATION
		this.#playerTimeDuration.classList.add('player-time');
		this.#playerTimeDuration.classList.add('player-time-duration');
		this.#playerTimeDuration.textContent = '00:00';

		// VOLUME CONTAINER
		// this.#playerVolumeContainer.classList.add('player-volume-container');

		// VOLUME CONTROL
		// this.#playerVolume.classList.add('player-volume');
		// this.#playerVolume.type = 'range';
		// this.#playerVolume.id = 'volume';
		// this.#playerVolume.min = '0';
		// this.#playerVolume.max = '1';
		// this.#playerVolume.value = '1';
		// this.#playerVolume.step = '0.01';

		// APPEND ELEMENTS
		// this.#playerVolumeContainer.appendChild(this.#playerVolume);

		// this.#playerProgressFilled.appendChild(this.#playerProgressButton);
		// this.#playerProgress.appendChild(this.#playerProgressFilled);

		this.#playerTimeline.appendChild(this.#playerTimeCurrent);
		this.#playerTimeline.appendChild(this.#playerProgress);
		this.#playerTimeline.appendChild(this.#playerTimeDuration);

		this.#playerPlay.appendChild(this.#playerIconPlay);
		this.#playerPlay.appendChild(this.#playerIconPause);

		this.#playerControls.appendChild(this.#playerPlay);
		this.#playerControls.appendChild(this.#playerTimeline);
		// this.#playerControls.appendChild(this.#playerVolumeContainer);

		this.#player.appendChild(this.#playerControls);
		this.#player.appendChild(this.#playerAudio);

		document.querySelector(playerClass).appendChild(this.#player);

		// this.playerContext = new AudioContext();
		// this.playerTrack = this.playerContext.createMediaElementSource(this.playerAudio);

		// Bridge the gap between gainNode and AudioContext so we can manipulate volume (gain)
		// this.playerGain = this.playerContext.createGain();

		// this.playerTrack.connect(this.playerGain).connect(this.playerContext.destination);

		// EVENT LISTENERS
		this.#playerPlay.addEventListener("click", this.playPause.bind(this));

		// Update progress bar and time values as audio plays
		this.#playerAudio.addEventListener("timeupdate", () => {
			if(!this.#playerMousedown) {
				this.#progressUpdate();
				this.#setTimes();
			}
		});

		// this.#playerAudio.addEventListener("ended", this.stop.bind(this));
		this.#playerProgress.addEventListener("change", this.#scrub.bind(this));
		this.#playerProgress.addEventListener("mousedown", () => (this.#playerMousedown = true));
		this.#playerProgress.addEventListener("mouseup", () => (this.#playerMousedown = false));

		// this.#playerVolume.addEventListener("change", () => {
		// 	// this.playerGain.gain.value = this.playerVolume.value;
		// });
	}

	playPause() {
		// check if context is in suspended state (autoplay policy)
		// By default, browsers won't allow you to autoplay audio.
		// You can override by finding the AudioContext state and resuming it after a user interaction like a "click" event.

		// if(this.playerContext.state === "suspended") {
		// 	this.playerContext.resume();
		// }

		// Play or pause track depending on state
		if(this.#playerPlay.dataset.playing === "false") {
			this.#playerAudio.play();
			this.#playerPlay.dataset.playing = "true";
			this.#playerIconPlay.classList.add("player-hidden");
			this.#playerIconPause.classList.remove("player-hidden");
		} else if(this.#playerPlay.dataset.playing === "true") {
			this.#playerAudio.pause();
			this.#playerPlay.dataset.playing = "false";
			this.#playerIconPause.classList.add("player-hidden");
			this.#playerIconPlay.classList.remove("player-hidden");
		}
	}

	stop() {
		this.#playerPlay.dataset.playing = "false";
		this.#playerIconPause.classList.add("player-hidden");
		this.#playerIconPlay.classList.remove("player-hidden");
		this.#playerProgress.value = '0';
		this.#playerAudio.currentTime = 0;
		this.#playerAudio.duration = this.playerAudio.duration;
	}

	load(file, type) {
		this.#playerAudio.textContent = '';
		const playerSource = document.createElement('source');
		playerSource.src = file;
		playerSource.type = type;
		this.#playerAudio.appendChild(playerSource);
		this.#playerAudio.load();
		this.#playerProgress.value = '0';
		this.#progressUpdate();
		this.#setTimes();
		console.log(this.#playerProgress.value);
	}

	#progressUpdate() {
		const percent = (this.#playerAudio.currentTime / this.#playerAudio.duration) * 100;
		this.#playerProgress.value = percent ? percent : '0';
	}

	#setTimes() {
		if(this.#playerAudio.duration) {
			this.#playerTimeCurrent.textContent = new Date(this.#playerAudio.currentTime * 1000).toISOString().substr(14, 5);
			this.#playerTimeDuration.textContent = new Date(this.#playerAudio.duration * 1000).toISOString().substr(14, 5);
		} else {
			this.#playerTimeCurrent.textContent = "00:00";
			this.#playerTimeDuration.textContent = "00:00";
		}
	}

	#scrub(e) {
		const scrubTime = e.target.value / 100;
		this.#playerAudio.currentTime = (this.#playerAudio.duration || 0) * scrubTime;
	}
}
