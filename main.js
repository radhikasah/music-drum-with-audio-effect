


var songs = [{
        'name': 'Marne Kasailai Rahar Hudaina (Title Track)',
        'artist': 'Prem Pariayr,Dr. KrishnaHari Baral,Gaire Suresh',
        'album': '(Nai nabhannu la 2',
        'duration': '3:32',
       'fileName': 'song1.mp3',
	   'image' :'song1.jpg'
    },
    {
        'name': 'Phool Ko Aankhama',
        'artist': 'Ravi Mhrz',
        'album': 'Nai nabhannu la 2',
        'duration': '6:06',
        'fileName': 'song2.mp3',
		'image' :'song2.jpg'
    },
    {
        'name': ' Naina',
        'artist': 'Arijit Singh',
        'album': 'Dangal',
        'duration': '3:45',
        'fileName': 'song3.mp3',
		'image' :'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': 'song4.mp3',
		'image' :'song4.jpg'
    }]
	





var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;
$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});
$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});

function timeJump() {
    var song = document.querySelector('audio')
    song.currentTime = song.duration - 5;
}
$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,8,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }

    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})
function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}



									function fancyTimeFormat(time)
								 					{
								 						// Hours, minutes and seconds
								 						var hrs = ~~(time / 3600);
								 						var mins = ~~((time % 3600) / 60);
								 						var secs = time % 60;

								 						// Output like "1:01" or "4:03:59" or "123:03:59"
								 						var ret = "";

								 						if (hrs > 0) {
								 							ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
								 						}

								 						ret += "" + mins + ":" + (secs < 10 ? "0" : "");
								 						ret += "" + secs;
								 						return ret;
								 					}




								 	function toggleSong() {
								 				var song = document.querySelector('audio');
								 				if(song.paused == true) {
								 				console.log('Playing');
								 				$('.play-icon').removeClass('fa-play').addClass('fa-pause');
								 				song.play();
								 				}
								 				else {
								 				console.log('Pausing');
								 				$('.play-icon').removeClass('fa-pause').addClass('fa-play');
								 				song.pause();
								 				}
								 				}

								 				     function changeCurrentSongDetails(songObj) {
								 								// Code goes here
								 								 $('.current-song-image').attr('src','img/'+ songObj.image)
								 								 $('.current-song-name').text(songObj.name)
								 								 $('.current-song-album').text(songObj.album)
								 							}

								 				        function updateCurrentTime() {
								 						var song = document.querySelector('audio');
								 						var currentTime = Math.floor(song.currentTime);
								 						currentTime = fancyTimeFormat(currentTime);
								 						var duration = Math.floor(song.duration);
								 						duration = fancyTimeFormat(duration)
								 						$('.time-elapsed').text(currentTime);
								 						$('.song-duration').text(duration);
								 					}


								 					function addSongNameClickEvent(songObj,position) {
								 				    var songName = songObj.fileName; // New Variable
								 					var id = '#song' + position;
								 							$(id).click(function() {
								 							var audio = document.querySelector('audio');
								 							var currentSong = audio.src;
								 							if(currentSong.search(songName) != -1)
								 							{
								 							toggleSong();
								 							}
								 							else {
								 							audio.src = songName;
								 							toggleSong();
								 							changeCurrentSongDetails(songObj); // Function Call
								 							}
								 							});
								                         }


								 								




								 				                window.onload = function() {

								 								changeCurrentSongDetails(songs[0]);
																
                                                                 for(var i =0; i < songs.length;i++) {
								 									var obj = songs[i];
								 									var name = '#song' + (i+1);
								 									var song = $(name);
								 									song.find('.song-name').text(obj.name);
								 									song.find('.song-artist').text(obj.artist);
								 									song.find('.song-album').text(obj.album);
								 									song.find('.song-length').text(obj.duration);
								 									addSongNameClickEvent(obj,i+1);
								                                     }

								 								//addSongNameClickEvent(fileNames[0],1);
								 								//addSongNameClickEvent(fileNames[1],2);
								 								//addSongNameClickEvent(fileNames[2],3);
								 								//addSongNameClickEvent(fileNames[3],4);
								 								//addSongNameClickEvent(fileNames[4],5);
								 								//addSongNameClickEvent(fileNames[5],6);
								 								//addSongNameClickEvent(fileNames[6],7);

								 								//for (var i = 0; i < fileNames.length ; i++) {
								 								//addSongNameClickEvent(fileNames[i],i+1);
								 							         //}
																	 updateCurrentTime();
								 								setInterval(function() {
								 								updateCurrentTime();

								 								},1000);

								 									$('#songs').DataTable({
								 									paging: false
								 								});
					 		                          }


								     $('.welcome-screen button').on('click', function() {
								         var name = $('#name-input').val();
								         if (name.length > 3) {
								             var message = "Welcome, " + name;
								             $('.main .user-name').text(message);
								             $('.welcome-screen').addClass('hidden');
								             $('.main').removeClass('hidden');
								         } else {
								             $('#name-input').addClass('error');
								         }
								     });
$('.fa-bars').on('click',function(){

	$(".Drumkit").toggleClass("hidden");
	$(".content").toggleClass("hidden");





});




 $('.play-icon').on('click', function() {
        toggleSong();
    });
		$('body').on('keypress',function(event) {
			// body pe kahi pe bhi key press karne pe yeh function chalo//
		var target = event.target;
		if (event.keyCode == 32 && target.tagName !='INPUT')
		{
			toggleSong();
		}
	});
										
																
																
															/*	$('.play-icon').on('click', function() {
								 							toggleSong();
								 						});



								 						$('body').on('keypress', function(event) {
								 									if (event.keyCode == 32) {
								 										toggleSong();
								 									}
								 								}); */
																
/*Drumkit*/


	// Onclick functions
	function clap() {
		var clap = document.querySelector("audio");
console.log(clap);
		clap.src="sounds/clap.wav";
console.log(clap.src);
		clap.currentTime = 0;
		clap.play();
		const key = document.querySelector(".key[data-key='65']");
		key.classList.add('playing'); // adds the css animation while its playing
	}

	function hihat() {

		var hihat = document.querySelector("audio");
		hihat.src="sounds/hihat.wav";
		hihat.currentTime = 0;
		hihat.play();
		const key = document.querySelector(".key[data-key='83']");
		key.classList.add('playing');
	}
	function kick() {
		const kick = document.querySelector("audio");
		kick.src="sounds/kick.wav"
		kick.currentTime = 0;
		kick.play();
		const key = document.querySelector(".key[data-key='68']");
		key.classList.add('playing');
	}
	function openhat() {
		const openhat = document.querySelector("audio");
		openhat.src="sounds/openhat.wav"
		openhat.currentTime = 0;
		openhat.play();
		const key = document.querySelector(".key[data-key='70']");
		key.classList.add('playing');
	}
	function boom() {
		const boom = document.querySelector("audio");
		boom.src="sounds/boom.wav"
		boom.currentTime = 0;
		boom.play();
		const key = document.querySelector(".key[data-key='71']");
		key.classList.add('playing');
	}
	function ride() {
		const ride = document.querySelector("audio");
		ride.src="sounds/ride.wav";
		ride.currentTime = 0;
		ride.play();
		const key = document.querySelector(".key[data-key='72']");
		key.classList.add('playing');
	}
	function snare() {
		const snare = document.querySelector("audio");
		snare.src="sounds/snare.wav"	;
		snare.currentTime = 0;
		snare.play();
		const key = document.querySelector(".key[data-key='74']");
		key.classList.add('playing');
	}
	function tom() {
		const tom = document.querySelector("audio");
		tom.src="sounds/tom.wav"
		tom.currentTime = 0;
		tom.play();
		const key = document.querySelector(".key[data-key='75']");
		key.classList.add('playing');
	}
	function tink() {
		const tink = document.querySelector("audio");
		tink.src="sounds/tink.wav"
		tink.currentTime = 0;
		tink.play();
		const key = document.querySelector(".key[data-key='76']");
		key.classList.add('playing');

	}

function removeTransition(e) {
  if(e.propertyName !== 'transform') return; // skip it if it's not a transform
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend',removeTransition));



$("body").on("keypress",function(e){

if(e.keyCode==65)
{

clap();

}

if(e.keyCode==83)
{
console.log("a");
hihat();

}

if(e.keyCode==68)
{
console.log("a");
kick();

}

if(e.keyCode==70)
{
console.log("a");
openhat();

}

if(e.keyCode==71)
{
console.log("a");
boom();

}

if(e.keyCode==72)
{
console.log("a");
ride();

}

if(e.keyCode==74)
{
console.log("a");
snare();

}


if(e.keyCode==75)
{
console.log("a");
tom();

}

if(e.keyCode==76)
{
console.log("a");
tink();

}
})
