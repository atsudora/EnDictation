const RANDUM_SENTENCE_RUL_API = "https://endictation.onrender.com/api/dictation/random/";
const typingInput = document.getElementById("typingInput");
const openHere = document.getElementById("openHere");
const questionNumber = document.getElementById("questionNumber");
const hidden = document.getElementById("hidden");
const englishDisplay = document.getElementById("englishDisplay");

const typingSound = new Audio("/static/app/audio/audio_typing-sound.mp3");
const correctSound = new Audio("/static/app/audio/audio_correct.mp3");
const wrongSound = new Audio("/static/app/audio/audio_wrong.mp3");

const exclude_pattern = [' ', '?', '!', '\'', '.', ',', '？', '！'];
const open_text = '日本語訳を見る <i class="fa-solid fa-toggle-on"></i><br>（Enter）';
const close_text = '日本語訳を隠す <i class="fa-solid fa-toggle-off"></i><br>（Enter）';

let audioFile;
let currentCharacterIndex = 0;
let count = 0;
let obj = document.getElementsByClassName('open-here');

async function RenderNextSentence() {
  count++;
  questionNumber.innerText = 'Question: ' + count;
  
  const sentence = await fetchRandomSentence();
  englishDisplay.innerText = "";
  openHere.innerText = sentence.japanese;
  audioFile = new Audio(sentence.audio);

  console.log(sentence.english);
  addSentenceToDisplay(sentence.english);
  playAudioFile();
}

async function fetchRandomSentence() {
  try {
    const response = await fetch(RANDUM_SENTENCE_RUL_API);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return { 
      english: data.english_sentence, 
      japanese: data.japanese_sentence, 
      audio: data.audio_file 
    };
  } catch(error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

function addSentenceToDisplay(sentence) {
  for (const character of sentence) {
    const spanField = document.createElement("span");
    spanField.innerText = character;
    spanField.style.display = "none";
    englishDisplay.appendChild(spanField);
  }
}

function playAudioFile() {
  if (audioFile) {
    audioFile.currentTime = 0;
    audioFile.play().catch(console.log);
  }
}

function stopAudioFile() {
  if (audioFile) {
    audioFile.pause();
    audioFile.currentTime = 0;
  }
}

function hintDisplay() {
  const targetElement = englishDisplay.children[currentCharacterIndex];
  targetElement.style.display = "inline";
  targetElement.style.color = "red";
  currentCharacterIndex++;

  skipCharacter();
  responseCorrectDisplayIfAllOK();
}

function onceAgain() {
  stopAudioFile();
  toggleAnswer("none");
  playAudioFile();

  for(const element of englishDisplay.children) {
    element.style.display = 'none';
  }
  currentCharacterIndex = 0;
}

function nextQuestion(){
  stopAudioFile();
  RenderNextSentence();
  toggleAnswer("none");
  currentCharacterIndex = 0;
}

function evaluateTyping(event) {
  const inputCharacter = event.key;
  const englishNumberRegex = /^[a-z0-9]$/i;  

  if (!englishNumberRegex.test(inputCharacter)) return;

  playSound(typingSound);

  const currentCharacter = englishDisplay.children[currentCharacterIndex].innerText;
  if (inputCharacter.toLowerCase() === currentCharacter.toLowerCase()) {
    englishDisplay.children[currentCharacterIndex].style.display = "inline";
    currentCharacterIndex++;
  } else {
    playSound(wrongSound);
  }

  skipCharacter();
  responseCorrectDisplayIfAllOK();
}

function playSound(audio) {
  audio.volume = 0.4;
  audio.currentTime = 0;
  audio.play().catch(console.log);
}

// Initialize first sentence
RenderNextSentence();

// Event Listeners
document.addEventListener("keyup", function(event) {
  if (event.key == 'Enter' && event.shiftKey) nextQuestion();
  else if (event.key == 'Enter') toggleAnswer("switch");
  else if ((event.key == 'Backspace' || event.key == 'Delete') && event.shiftKey) hintDisplay();
  else if (event.code == 'Space') playAudioFile();
  else if ((event.key == 'Backspace' || event.key == 'Delete') && event.ctrlKey) onceAgain();
});

document.addEventListener("keydown", evaluateTyping);