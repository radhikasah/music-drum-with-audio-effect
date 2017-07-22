const keycodeMatches = [65, 83, 68, 70, 71, 72, 74, 75, 76];
const recordStatus = document.querySelector('.recording');
const playbackList = document.querySelector('.playback');

let startTime = null;
let recordings = [];
let record = false;
let playing = false;

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

function handleKeypress(e) {
    // check for audio keys => play sound and record if true
    if (keycodeMatches.indexOf(e.keyCode) >= 0) {
        console.log('audio key pressed');
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const keyEl = document.querySelector(`div[data-key="${e.keyCode}"]`);

        keyEl.classList.add('playing');
        audio.currentTime = 0;
        audio.play();

        if (record) {
            recordings.push({
                name: keyEl.querySelector('.sound').innerHTML,
                audio: audio,
                timestamp: new Date()
            });

            while (playbackList.children.length) {
                playbackList.removeChild(playbackList.firstChild);
            }

            recordings.forEach(r => {
                const playbackEl = document.createElement('span');
                playbackEl.classList.add('playback-item');
                playbackEl.innerHTML = r.name
                playbackList.appendChild(playbackEl);
            })
        }
        return;
    }

    // check for record key and toggle recording
    if (e.keyCode === 82) {
        startTime = record ? startTime : new Date();
        record = !record;
        recordStatus.style.backgroundColor = record ? 'red' : 'gray';
        return;
    }

    // check for playback key and playback if not recording
    if (e.keyCode === 80) {
        if (!record && recordings.length > 0 && !playing) {
            playing = true;
            recordings.forEach((r, i) => {
                setTimeout(() => {
                    r.audio.currentTime = 0;
                    r.audio.play();
                    document.querySelector('.playback').children.item(i).classList.add('active');
                }, r.timestamp - startTime);
            });
            setTimeout(() => {
                recordings = [];
                playing = false;
            }, recordings[recordings.length - 1].timestamp - startTime);
        }
        return;
    }
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', handleKeypress);
