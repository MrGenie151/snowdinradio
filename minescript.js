var songs = [
	"Gpd85y_iTxY",
	"oGxQNQtnr6Q",
	"laZusNy8QiY",
	"nz8QEpaGoJg",
	"4i0d6CPLSGo",
	"mukiMaOSLEs",
	"9lX-hVpvN3E",
	"JQw8MEqhMRA",
	"cCibTj6drhM",
	"UqKcX87h3c0",
	"xmBfruermmo",
	"0E5l2GHBxB8",
	"d6tV0cr9zYI",
	"zqw8FylO_Y8",
	"sBl9qcaQos4",
	"0y53iF8BTSU",
	"C8df2pbOX6g",
	"j1Z_Ihkluek",
	"nIv71OMWDlM",
	"kK81m-A3qpU"
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
	if (localStorage.getItem("currentSong-Minecraft")) {
		videoId = localStorage.getItem("currentSong-Minecraft");
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
	localStorage.setItem("currentSong-Minecraft", newSong)
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
