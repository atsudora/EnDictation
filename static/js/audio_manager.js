export class AudioManager {
    constructor(typingSrc, correctSrc, wrongSrc, audioSrc) {
        this.typingSound = new Audio(typingSrc);
        this.correctSound = new Audio(correctSrc);
        this.wrongSound = new Audio(wrongSrc);
        this.audioFile = new Audio(audioSrc);
    }

    playSound(audio) {
        audio.volume = 0.4;
        audio.currentTime = 0;
        audio.play().catch(console.log);
    }

    playAudioFile() {
        if (this.audioFile) {
            this.audioFile.currentTime = 0;
            this.audioFile.play().catch(console.log);
        }
    }

    stopAudioFile() {
        if (this.audioFile) {
            this.audioFile.pause();
            this.audioFile.currentTime = 0;
        }
    }
}
