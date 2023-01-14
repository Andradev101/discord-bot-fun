const { playAudioFile } = require('audic');

playAudioFile('audio.mp3');

audic.addEventListener('ended', () => {
    audic.destroy();
});