import { SentenceManager } from './SentenceManager.js';
import { InputManager } from './InputManager.js';

const englishDisplay = document.getElementById("englishDisplay");
const openHere = document.getElementById("openHere");
const questionNumber = document.getElementById("questionNumber");

const sentenceManager = new SentenceManager(englishDisplay, openHere, questionNumber);
const inputManager = new InputManager(englishDisplay);

sentenceManager.RenderNextSentence();

document.addEventListener("keydown", (event) => {
    inputManager.evaluateTyping(event.key);
});
