var songs = [
	"18--CryqPp8", //done
	"n-mw_03jWaY", //done
	"ydrRQE1r1NA", //done
	"y0D1yCCl5Xc", //done
	"woieXASPZxQ", //done
	"GTbwHQ4zU2Y", //done
	"UM4ttc1eLas", //done
	"BKuucLrUL6g", //done
	"WMjytiClUzw", //done
	"7ZxaTLpdwD0", //done
	"-KjGi6eNRyE", //done
	"1d2vojMHvC0", //done
	"MLNAHrHreCY", //done
	"pHdObRZyAdI", //done
	"Rk7GquhH7Wc", //done
	"T33bLx9b43s", //done
	"LhqUNpPPz5c" //done
]

var songCounter = document.getElementById("song-counter")
songCounter.innerHTML = songs.length

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	var videoId;
	if (localStorage.getItem("currentSong-FNF")) {
		videoId = localStorage.getItem("currentSong-FNF");
	}
	else {
		videoId = songs[getRndInteger(0, songs.length-1)];
	}
	player = new YT.Player('video', {
		height: '390',
		width: '640',
		videoId: videoId,
		playerVars: {
			'playsinline': 1
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED) {
		console.log("coolio")
		startNewSong()
	}
}

function startNewSong() {
	var newSong = getNewSong()
	localStorage.setItem("currentSong-FNF", newSong)
	player.loadVideoById(newSong, 0)
}

function stopVideo() {
	player.stopVideo();
}

document.addEventListener("beforeunload", function () {
	if (player.getPlayerState() == 1) {
		localStorage.setItem("song_timestamp", player.getElapsedTime())
	}
})

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSongId() {
	var str = player.getVideoUrl()
	str = str.substring(32)
	return str
}

function getNewSong() {
	var newSong = songs[getRndInteger(0, songs.length-1)]
	if (!(newSong == getSongId())) {
		return newSong
	}
	else {
		newSong = getNewSong()
		return newSong
	}
}
