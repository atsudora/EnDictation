import { EXCLUDE_PATTERN } from './constants.js';

export class InputManager {
    constructor(englishDisplay) {
        this.englishDisplay = englishDisplay;
        this.currentCharacterIndex = 0;
    }

    evaluateTyping(inputCharacter) {
        const englishNumberRegex = /^[a-z0-9]$/i;

        if (!englishNumberRegex.test(inputCharacter)) return;

        const currentCharacter = this.englishDisplay.children[this.currentCharacterIndex].innerText;
        if (inputCharacter.toLowerCase() === currentCharacter.toLowerCase()) {
            this.englishDisplay.children[this.currentCharacterIndex].style.display = "inline";
            this.currentCharacterIndex++;
        } else {
            console.log("Wrong input");
        }

        this.skipCharacter();
    }

    skipCharacter() {
        const nextCharacter = this.englishDisplay.children[this.currentCharacterIndex].innerText;
        if (EXCLUDE_PATTERN.includes(nextCharacter)) {
            this.englishDisplay.children[this.currentCharacterIndex].style.display = "inline";
            this.currentCharacterIndex++;
        }
    }
}
