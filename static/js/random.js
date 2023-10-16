import { RANDUM_SENTENCE_URL_API, exclude_pattern, open_text, close_text } from './constants.js';

export class Random {
  constructor() {
    this.typingInput = document.getElementById("typingInput");
    this.openHere = document.getElementById("openHere");
    this.questionNumber = document.getElementById("questionNumber");
    this.hidden = document.getElementById("hidden");
    this.englishDisplay = document.getElementById("englishDisplay");
    this.typingSound = new Audio("/static/app/audio/audio_typing-sound.mp3");
    this.correctSound = new Audio("/static/app/audio/audio_correct.mp3");
    this.wrongSound = new Audio("/static/app/audio/audio_wrong.mp3");
    this.audioFile = null;
    this.currentCharacterIndex = 0;
    this.count = 0;
    this.obj = document.getElementsByClassName('open-here');

    this.initialize();
  }

  initialize() {
    this.RenderNextSentence();

    // Event Listeners
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
    document.addEventListener("keydown", this.evaluateTyping.bind(this));

    document.getElementById("hidden").addEventListener("click", () => this.toggleAnswer("switch"));
    document.getElementById("once-again-audio").addEventListener("click", this.playAudioFile.bind(this));
    document.getElementById("hint-display").addEventListener("click", this.hintDisplay.bind(this));
    document.getElementById("repeat").addEventListener("click", this.onceAgain.bind(this));
    document.getElementById("next-question").addEventListener("click", this.nextQuestion.bind(this));
  }

  async RenderNextSentence() {
    this.count++;
    this.questionNumber.innerText = 'Question: ' + this.count;

    const sentence = await this.fetchRandomSentence();
    this.englishDisplay.innerText = "";
    this.openHere.innerText = sentence.japanese;
    this.audioFile = new Audio(sentence.audio);

    console.log(sentence.english);
    this.addSentenceToDisplay(sentence.english);
    this.playAudioFile();
  }

  async fetchRandomSentence() {
    try {
      const response = await fetch(RANDUM_SENTENCE_URL_API);
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

  checkAllCharactersDisplayed() {
    for (let i = 0; i < this.englishDisplay.children.length; i++) {
      if (this.englishDisplay.children[i].style.display === 'none') {
        return false;
      }
    }
    return true;
  }

  responseCorrectDisplayIfAllOK() {
    if (this.checkAllCharactersDisplayed()) {
      this.correctSound.volume = 0.4;
      this.correctSound.currentTime = 0;
      this.correctSound.play().catch((error) => console.log("Sound couldn't be played:", error));
      this.questionNumber.innerText += ' Good!!';
      this.toggleAnswer("inline-block");
    }
  }

  playSound(audio) {
    audio.volume = 0.4;
    audio.currentTime = 0;
    audio.play().catch(console.log);
  }

  playAudioFile() {
    if (this.audioFile) {
      this.audioFile.currentTime = 0;
      this.audioFile.play().catch(console.log);
    }
  }

  stopAudioFile() {
    if (this.audioFile) {
      this.audioFile.pause();
      this.audioFile.currentTime = 0;
    }
  }

  skipCharacter() {
    const nextCharacter = this.englishDisplay.children[this.currentCharacterIndex].innerText;
    if (exclude_pattern.includes(nextCharacter)) {
      this.englishDisplay.children[this.currentCharacterIndex].style.display = "inline";
      this.currentCharacterIndex++;
    }
  }

  hintDisplay() {
    const targetElement = this.englishDisplay.children[this.currentCharacterIndex];
    targetElement.style.display = "inline";
    targetElement.style.color = "red";
    this.currentCharacterIndex++;

    this.skipCharacter();
    this.responseCorrectDisplayIfAllOK();
  }

  onceAgain() {
    this.stopAudioFile();
    this.toggleAnswer("none");
    this.playAudioFile();

    for (const element of this.englishDisplay.children) {
      element.style.display = 'none';
      element.style.color = "black";
    }
    this.currentCharacterIndex = 0;
  }

  nextQuestion() {
    this.stopAudioFile();
    this.RenderNextSentence();
    this.toggleAnswer("none");
    this.currentCharacterIndex = 0;
  }

  keyUpHandler(event) {
    if (event.key == 'Enter' && event.shiftKey) this.nextQuestion();
    else if (event.key == 'Enter') this.toggleAnswer("switch");
    else if ((event.key == 'Backspace' || event.key == 'Delete') && event.shiftKey) this.hintDisplay();
    else if (event.code == 'Space') this.playAudioFile();
    else if ((event.key == 'Backspace' || event.key == 'Delete') && event.ctrlKey) this.onceAgain();
  }

  evaluateTyping(event) {
    const inputCharacter = event.key;
    const englishNumberRegex = /^[a-z0-9]$/i;

    if (!englishNumberRegex.test(inputCharacter)) return;

    this.playSound(this.typingSound);

    const currentCharacter = this.englishDisplay.children[this.currentCharacterIndex].innerText;
    if (inputCharacter.toLowerCase() === currentCharacter.toLowerCase()) {
      this.englishDisplay.children[this.currentCharacterIndex].style.display = "inline";
      this.currentCharacterIndex++;
    } else {
      this.playSound(this.wrongSound);
    }

    this.skipCharacter();
    this.responseCorrectDisplayIfAllOK();
  }

  toggleAnswer(display) {
    for (var i = 0; i < this.obj.length; i++) {
      this.obj[i].style.display = display;
      this.hidden.innerHTML = display === "none" ? open_text : close_text;
    };
    if (display == "switch") {
      for (var i = 0; i < this.obj.length; i++) {
        if (this.obj[i].style.display == "inline-block") {
          this.obj[i].style.display = "none";
          this.hidden.innerHTML = open_text;
        }
        else {
          this.obj[i].style.display = "inline-block";
          this.hidden.innerHTML = close_text;
        }
      };
    }
  }
}

new Random();