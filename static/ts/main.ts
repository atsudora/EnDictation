import { SentenceManager } from "./sentence_manager";
import { InputManager } from "./input_manager";
import { AudioManager } from './audio_manager';
import { UIManager } from './ui_manager';

const englishDisplay = document.getElementById("englishDisplay") as HTMLElement;
const openHere = document.getElementById("openHere") as HTMLElement;
const questionNumber = document.getElementById("questionNumber") as HTMLElement;
const obj = document.getElementsByClassName('open-here');
const hidden = document.getElementById("hidden") as HTMLElement;

const typingSrc = "/static/app/audio/audio_typing-sound.mp3";
const correctSrc = "/static/app/audio/audio_correct.mp3";
const wrongSrc = "/static/app/audio/audio_wrong.mp3";

const sentenceManager = new SentenceManager(englishDisplay, openHere, questionNumber);
const inputManager = new InputManager(englishDisplay);
const audioManager = new AudioManager(typingSrc, correctSrc, wrongSrc);
const uiManager = new UIManager(englishDisplay, openHere, obj, hidden);

sentenceManager.RenderNextSentence();

document.addEventListener("keydown", (event) => {
  inputManager.evaluateTyping(event.key);
});
