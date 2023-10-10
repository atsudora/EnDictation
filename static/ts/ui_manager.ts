import { SentenceManager } from "./sentence_manager";
import {AudioManager} from "./audio_manager"

export class UIManager {
	private englishDisplay: HTMLElement;
	private openHere: HTMLElement;
	private obj: HTMLCollectionOf<Element>;
	private hidden: HTMLElement;

	constructor(
		englishDisplay: HTMLElement,
		openHere: HTMLElement,
		obj: HTMLCollectionOf<Element>,
		hidden: HTMLElement
	) {
		this.englishDisplay = englishDisplay;
		this.openHere = openHere;
		this.obj = obj;
		this.hidden = hidden;
	}

	toggleAnswer(display: string): void {
		for (let i = 0; i < this.obj.length; i++) {
			(this.obj[i] as HTMLElement).style.display = display;
			this.hidden.innerHTML =
				display === "none" ? "OPEN_TEXT" : "CLOSE_TEXT";
		}
		if (display == "switch") {
			for (let i = 0; i < this.obj.length; i++) {
				if (
					(this.obj[i] as HTMLElement).style.display == "inline-block"
				) {
					(this.obj[i] as HTMLElement).style.display = "none";
					this.hidden.innerHTML = "OPEN_TEXT";
				} else {
					(this.obj[i] as HTMLElement).style.display = "inline-block";
					this.hidden.innerHTML = "CLOSE_TEXT";
				}
			}
		}
	}

	hintDisplay(sentenceManager: SentenceManager): void {
		const targetElement = this.englishDisplay.children[
			sentenceManager.currentCharacterIndex
		] as HTMLElement;
		targetElement.style.display = "inline";
		targetElement.style.color = "red";
		sentenceManager.currentCharacterIndex++;

		sentenceManager.skipCharacter();
	}

	onceAgain(audioManager: AudioManager): void {
		audioManager.stopAudioFile();
		this.toggleAnswer("none");
		audioManager.playAudioFile();

		for (const element of Array.from(
			this.englishDisplay.children
		) as HTMLElement[]) {
			element.style.display = "none";
		}
	}

	nextQuestion(
		sentenceManager: SentenceManager,
		audioManager: AudioManager
	): void {
		audioManager.stopAudioFile();
		sentenceManager.RenderNextSentence();
		this.toggleAnswer("none");
	}
}
