import { SentenceManager } from './SentenceManager.js';
import { InputManager } from './InputManager.js';
import { AudioManager } from './AudioManager.js';
import { UIManager } from './UIManager.js';

const englishDisplay = document.getElementById("englishDisplay");
const openHere = document.getElementById("openHere");
const questionNumber = document.getElementById("questionNumber");
const obj = document.getElementsByClassName('open-here');
const hidden = document.getElementById("hidden");

const typingSrc = "/static/app/audio/audio_typing-sound.mp3";
const correctSrc = "/static/app/audio/audio_correct.mp3";
const wrongSrc = "/static/app/audio/audio_wrong.mp3";

const sentenceManager = new SentenceManager(englishDisplay, openHere, questionNumber);
const inputManager = new InputManager(englishDisplay, sentenceManager);
const audioManager = new AudioManager(typingSrc, correctSrc, wrongSrc, sentenceManager.audioSrc);
const uiManager = new UIManager(englishDisplay, openHere, obj, hidden);

sentenceManager.RenderNextSentence();

document.addEventListener("keydown", (event) => {
  inputManager.evaluateTyping(event, audioManager, uiManager);
});
