import { SentenceManager } from './sentence_manager.js';
import { InputManager } from './input_manager.js';

const englishDisplay = document.getElementById("englishDisplay");
const openHere = document.getElementById("openHere");
const questionNumber = document.getElementById("questionNumber");

const sentenceManager = new SentenceManager(englishDisplay, openHere, questionNumber);
const inputManager = new InputManager(englishDisplay);

sentenceManager.RenderNextSentence();

document.addEventListener("keydown", (event) => {
  inputManager.evaluateTyping(event.key);
});
