import { RANDUM_SENTENCE_RUL_API } from './constants.js';

export class SentenceManager {
    constructor(englishDisplay, openHere, questionNumber) {
        this.count = 0;
        this.englishDisplay = englishDisplay;
        this.openHere = openHere;
        this.questionNumber = questionNumber;
        this.currentCharacterIndex = 0;
    }

    async RenderNextSentence() {
        this.count++;
        this.questionNumber.innerText = 'Question: ' + this.count;
        const sentence = await this.fetchRandomSentence();
        this.englishDisplay.innerText = "";
        this.openHere.innerText = sentence.japanese;

        console.log(sentence.english);
        this.addSentenceToDisplay(sentence.english);
    }

    async fetchRandomSentence() {
        try {
            const response = await fetch(RANDUM_SENTENCE_RUL_API);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return {
                english: data.english_sentence,
                japanese: data.japanese_sentence,
                audio: data.audio_file
            };
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    addSentenceToDisplay(sentence) {
        for (const character of sentence) {
            const spanField = document.createElement("span");
            spanField.innerText = character;
            spanField.style.display = "none";
            this.englishDisplay.appendChild(spanField);
        }
    }
}
