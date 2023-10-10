import { SentenceManager } from "./sentence_manager";
import { InputManager } from "./input_manager";

const englishDisplay = document.getElementById("englishDisplay") as HTMLElement;
const openHere = document.getElementById("openHere") as HTMLElement;
const questionNumber = document.getElementById("questionNumber") as HTMLElement;

const sentenceManager = new SentenceManager(
	englishDisplay,
	openHere,
	questionNumber
);
const inputManager = new InputManager(englishDisplay);

sentenceManager.RenderNextSentence();

document.addEventListener("keydown", (event: KeyboardEvent) => {
	inputManager.evaluateTyping(event.key);
});
