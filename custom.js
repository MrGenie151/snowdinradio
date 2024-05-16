let params = new URLSearchParams(window.location.search);
let query = params.get('query');
let pageAmount = params.get('pages') || 1;
let isEmbed = params.get('embed') || false;
let songs = [];
let songIdx = 0;
let songOrder;
const sleep = ms => new Promise(r => setTimeout(r, ms));

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	var videoId = "LBpXE-RKd5k";
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


function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        console.log("coolio")
        startNewSong()
    }
}

function songOverflow() {
	return (songIdx % songs.length-1)
}

$(document).ready(async function() {
	$("#query").val(query)
	$("#page").val(pageAmount)
    if (query) {
		document.title = query + " Station - Snowdin Radio"
		if ( isEmbed == false ) {
			document.getElementById("embed-title").setAttribute("content", query + " Station - Snowdin Radio");
		}
		for (let step = 0; step < pageAmount; step++) {
	        $.get("https://invidious.baczek.me/api/v1/search?q=" + query + "&type=video&duration=short&sort_by=view_count&page="+step.toString(), function(data, status) {
	            if (status === "success") {
	                data.forEach(function(yay2) {
						//if (yay2["authorVerified"]) {
	                    songs.push(yay2["videoId"]);
						//}
	                });
	                console.log(songs)
					if (isEmbed == false) {
		                let songCounter = document.getElementById("song-counter");
		                songCounter.innerHTML = songs.length;
					}
					
	                if (player !== undefined && player !== null) {
						songOrder = randoSequence(songs)
						console.log(songOrder)
			            player.loadVideoById(songOrder[songOverflow()]["value"])
			        }
	
	                // 4. The API will call this function when the video player is ready.
	
	                // 5. The API calls this function when the player's state changes.
	                //    The function indicates that when playing a video (state=1),
	                //    the player should play for six seconds and then stop.
	            } else {
	                console.log("Error in retrieving data from the API.");
	            }
	        });
		}
    }
    $("#create").click(function() {
        queryCreate()
    })
	$("#embedthis").click(function() {
		location.href = "customembed.html?query=" + query + "&pages=" + pageAmount + "&embed=true"
	})
});

let done = false;



function startNewSong() {
	songIdx += 1
    let newSong = songOrder[songOverflow()]["value"]
        //localStorage.setItem("currentSong", newSong)
	console.log(newSong)
    player.loadVideoById(newSong, 0)
}

function stopVideo() {
    player.stopVideo();
}

document.addEventListener("beforeunload", function() {
    if (player.getPlayerState() == 1) {
        localStorage.setItem("song_timestamp", player.getElapsedTime());
    }
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSongId() {
    let str = player.getVideoUrl()
    str = str.substring(32)
    return str
}

function getNewSong() {
    let newSong = songs[rando(songs.length - 1)]
    if (!(newSong == getSongId())) {
        return newSong
    } else {
        newSong = getNewSong()
        return newSong
    }
}

function queryCreate() {
    let newQuery = $("#query").val()
	let newPages = $("#page").val()
    location.href = "customstation.html?query=" + newQuery + "&pages=" + newPages
}