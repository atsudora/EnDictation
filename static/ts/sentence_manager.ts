import { RANDUM_SENTENCE_RUL_API, EXCLUDE_PATTERN } from "./constracts";

interface Sentence {
	english: string;
	japanese: string;
	audio: string;
}

export class SentenceManager {
	private count: number;
	private englishDisplay: HTMLElement;
	private openHere: HTMLElement;
	private questionNumber: HTMLElement;
	public currentCharacterIndex: number;

	constructor(
		englishDisplay: HTMLElement,
		openHere: HTMLElement,
		questionNumber: HTMLElement
	) {
		this.count = 0;
		this.englishDisplay = englishDisplay;
		this.openHere = openHere;
		this.questionNumber = questionNumber;
		this.currentCharacterIndex = 0;
	}

	async RenderNextSentence(): Promise<void> {
		this.count++;
		this.questionNumber.innerText = "Question: " + this.count;
		const sentence = await this.fetchRandomSentence();
		if (!sentence) return; // Add this to handle the potential undefined value from fetchRandomSentence

		this.englishDisplay.innerText = "";
		this.openHere.innerText = sentence.japanese;

		console.log(sentence.english);
		this.addSentenceToDisplay(sentence.english);
	}

	public skipCharacter(): boolean {
		const nextCharacter =
			this.englishDisplay.children[this.currentCharacterIndex]
				.textContent;
		if (EXCLUDE_PATTERN.includes(nextCharacter || "")) {
			(
				this.englishDisplay.children[
					this.currentCharacterIndex
				] as HTMLElement
			).style.display = "inline";
			this.currentCharacterIndex++;
			return true;
		}
		return false;
	}

	private async fetchRandomSentence(): Promise<Sentence | undefined> {
		try {
			const response = await fetch(RANDUM_SENTENCE_RUL_API);
			if (!response.ok) throw new Error("Network response was not ok");
			const data = await response.json();
			return {
				english: data.english_sentence,
				japanese: data.japanese_sentence,
				audio: data.audio_file,
			};
		} catch (error) {
			console.error(
				"There has been a problem with your fetch operation:",
				error
			);
		}
	}

	private addSentenceToDisplay(sentence: string): void {
		for (const character of sentence) {
			const spanField = document.createElement("span");
			spanField.innerText = character;
			spanField.style.display = "none";
			this.englishDisplay.appendChild(spanField);
		}
	}
}
