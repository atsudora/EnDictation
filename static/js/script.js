const RANDUM_SENTENCE_RUL_API = "https://endictation.onrender.com/api/dictation/random/";
const typingInput = document.getElementById("typingInput");
const openHere = document.getElementById("openHere");
const questionNumber = document.getElementById("questionNumber");
const hidden = document.getElementById("hidden");
const englishDisplay = document.getElementById("englishDisplay");

const typingSound = new Audio("/static/app/audio/audio_typing-sound.mp3");
const correctSound = new Audio("/static/app/audio/audio_correct.mp3");
const wrongSound = new Audio("/static/app/audio/audio_wrong.mp3");

const exclude_pattern = [' ', '?', '!', '\'', '.', ',', '？', '！', '-'];
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

/**
 * 全ての文字が正解したかを確認する関数
 */
function checkAllCharactersDisplayed() {
  for(let i = 0; i < englishDisplay.children.length; i++) {
    if(englishDisplay.children[i].style.display === 'none') {
      return false; // 未表示の文字がある場合はfalseを返す
    }
  }
  return true; // すべての文字が表示されている場合はtrueを返す
}

/**
 * 全ての文字が表示されていた場合に正解ですと返す。
 *   */
function responseCorrectDisplayIfAllOK() {
  // 全ての文字が表示されているか確認する
  if(checkAllCharactersDisplayed()) {
    // エラー処理の追加
    correctSound.volume = 0.4;
    correctSound.currentTime = 0;
    correctSound.play().catch((error) => console.log("Sound couldn't be played:", error));
    questionNumber.innerText += ' Good!!';
    toggleAnswer("inline-block");
  }
}

function playSound(audio) {
  audio.volume = 0.4;
  audio.currentTime = 0;
  audio.play().catch(console.log);
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

function skipCharacter() {
  const nextCharacter = englishDisplay.children[currentCharacterIndex].innerText;
  if (exclude_pattern.includes(nextCharacter)) {
    englishDisplay.children[currentCharacterIndex].style.display = "inline";
    currentCharacterIndex++;
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

function toggleAnswer(display) {
  for (var i = 0; i < obj.length; i++) {
    obj[i].style.display = display;
    hidden.innerHTML = display === "none" ? open_text : close_text;
  };
  if(display == "switch"){
    for(var i=0;i<obj.length;i++){
      //非表示ならインライン要素に変更。表示状態なら非表示に変更。
      if(obj[i].style.display == "inline-block"){
          obj[i].style.display = "none";
          hidden.innerHTML = open_text;
      }
      else{
          obj[i].style.display = "inline-block";
          hidden.innerHTML = close_text;
      }
  };
  }
};

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
