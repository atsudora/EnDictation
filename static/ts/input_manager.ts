import { EXCLUDE_PATTERN } from "./constracts";

export class InputManager {
	private englishDisplay: HTMLElement;
	private currentCharacterIndex: number;

	constructor(englishDisplay: HTMLElement) {
		this.englishDisplay = englishDisplay;
		this.currentCharacterIndex = 0;
	}

	evaluateTyping(inputCharacter: string): void {
		const englishNumberRegex = /^[a-z0-9]$/i;

		if (!englishNumberRegex.test(inputCharacter)) return;

		const currentCharacter =
			this.englishDisplay.children[this.currentCharacterIndex]
				.textContent;
		if (inputCharacter.toLowerCase() === currentCharacter?.toLowerCase()) {
			(
				this.englishDisplay.children[
					this.currentCharacterIndex
				] as HTMLElement
			).style.display = "inline";
			this.currentCharacterIndex++;
		} else {
			console.log("Wrong input");
		}

		this.skipCharacter();
	}

	private skipCharacter(): void {
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
		}
	}
}
