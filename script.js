const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const artist = document.querySelector('#artist')
const cover = document.querySelector('#cover')

// song titles

songs = new Array()

songs[0] = new Array('So-Mi-So', 'Wande Coal');
songs[1] = new Array('West Side Highway', 'Asap Rocky');
songs[2] = new Array('Tell-Me', 'Slum Village');


// Keep track of the songs
let songIndex = 1

// Initially load song into DOM

loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song[0]
    artist.innerText = song[1]
    audio.src = `music/${song[0]}.mp3`
    cover.src = `images/${song[0]}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}


function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}


function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    songIndex++

    const tracks = songs.length - 1;

    if (songIndex > tracks) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}


function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}


function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
//Event listener

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})


// change song evnts
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)