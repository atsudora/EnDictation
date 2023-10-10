import { OPEN_TEXT, CLOSE_TEXT } from './constants.js';

export class UIManager {
    constructor(englishDisplay, openHere, obj, hidden) {
        this.englishDisplay = englishDisplay;
        this.openHere = openHere;
        this.obj = obj;
        this.hidden = hidden;
    }

    toggleAnswer(display) {
        for (let i = 0; i < this.obj.length; i++) {
            this.obj[i].style.display = display;
            this.hidden.innerHTML = display === "none" ? OPEN_TEXT : CLOSE_TEXT;
        }
        if (display == "switch") {
            for (let i = 0; i < this.obj.length; i++) {
                if (this.obj[i].style.display == "inline-block") {
                    this.obj[i].style.display = "none";
                    this.hidden.innerHTML = OPEN_TEXT;
                } else {
                    this.obj[i].style.display = "inline-block";
                    this.hidden.innerHTML = CLOSE_TEXT;
                }
            }
        }
    }

    hintDisplay(sentenceManager) {
        const targetElement = this.englishDisplay.children[sentenceManager.currentCharacterIndex];
        targetElement.style.display = "inline";
        targetElement.style.color = "red";
        sentenceManager.currentCharacterIndex++;

        sentenceManager.skipCharacter();
    }

    onceAgain(audioManager) {
        audioManager.stopAudioFile();
        this.toggleAnswer("none");
        audioManager.playAudioFile();

        for (const element of this.englishDisplay.children) {
            element.style.display = 'none';
        }
    }

    nextQuestion(sentenceManager, audioManager) {
        audioManager.stopAudioFile();
        sentenceManager.RenderNextSentence();
        this.toggleAnswer("none");
    }
}
