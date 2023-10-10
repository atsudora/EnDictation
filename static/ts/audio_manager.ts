export class AudioManager {
	private typingSound: HTMLAudioElement;
	private correctSound: HTMLAudioElement;
	private wrongSound: HTMLAudioElement;
	public audioFile: HTMLAudioElement | null = null;

	constructor(
		typingSrc: string,
		correctSrc: string,
		wrongSrc: string,
	) {
		this.typingSound = new Audio(typingSrc);
		this.correctSound = new Audio(correctSrc);
		this.wrongSound = new Audio(wrongSrc);
	}

	playSound(audio: HTMLAudioElement): void {
		audio.volume = 0.4;
		audio.currentTime = 0;
		audio.play().catch(console.log);
	}

	playAudioFile(): void {
		if (this.audioFile) {
			this.audioFile.currentTime = 0;
			this.audioFile.play().catch(console.log);
		}
	}

	stopAudioFile(): void {
		if (this.audioFile) {
			this.audioFile.pause();
			this.audioFile.currentTime = 0;
		}
	}
}
