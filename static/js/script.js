const RANDUM_SENTENCE_RUL_API = "http://127.0.0.1:8000/api/dictation/random/";
const typingInput = document.getElementById("typingInput")
const openHere = document.getElementById("openHere")
const counter = document.getElementById("counter")
const hidden = document.getElementById("hidden")
const judge = document.getElementById("judge")

const typingSound = new Audio("./audio/audio_typing-sound.mp3");
const correctSound = new Audio("./audio/audio_correct.mp3");
const wrongSound = new Audio("./audio/audio_wrong.mp3");

let audioFile;
let englishDisplay = document.getElementById("englishDisplay")
let currentCharacterIndex = 0;

const exclude_pattern =[
  ' ',
  '?',
  '!',
  '\'',
  '.',
  ',',
  '？',
  '！',
]

const open_text = "日本語訳を見る<br>（Enter）";
const close_text = "日本語訳を隠す<br>（Enter）";

/**
 * ショートカットキー
 */
document.addEventListener("keyup", function(event) {
  if (event.key == 'Enter' && event.shiftKey) {
    nextQuestion();
  } else if (event.key == 'Enter') {
    toggleAnswer("switch");
  }
  if (event.key == 'Backspace' && event.shiftKey || event.key == 'Delete' && event.shiftKey) {
    onceAgain();
  }
  if (event.code == 'Space') {
    playAudioFile();
  }
});

/**
* 折り畳み表示
* 'openHere'というクラスに属するオブジェクトをインライン要素or非表示に変更する。
*/
var obj = document.getElementsByClassName('open-here');
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

/**
 * 
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
 * 取得したオーディオファイルを再生する関数
 */
function playAudioFile() {
  if (audioFile) {
    audioFile.play().catch((error) => console.log("Audio file couldn't be played:", error));
  }
}

/**
 * キーボードからの入力を英文を評価する。
 */
document.addEventListener("keydown", function(event) {
  const inputCharacter = event.key;
  const englishNumberRegex = /^[a-z0-9]$/i;  // 英数字をチェックする正規表現
  // キーが英数字でない場合は処理を終了
  if (!englishNumberRegex.test(inputCharacter)) {
    return;
  }
  typingSound.volume = 0.4;
  typingSound.currentTime = 0;
  typingSound.play().catch((error) => console.log("Sound couldn't be played:", error));

  // エラー処理の追加
  if (englishDisplay.children[currentCharacterIndex]) {
    console.log(englishDisplay.children[currentCharacterIndex]);
    const currentCharacter = englishDisplay.children[currentCharacterIndex].innerText;
    if (inputCharacter.toLowerCase() === currentCharacter.toLowerCase()) {
      englishDisplay.children[currentCharacterIndex].style.display = "inline";
      currentCharacterIndex++;
    } else {
      // エラー処理の追加
      wrongSound.volume = 0.2;
      wrongSound.currentTime = 0;
      wrongSound.play().catch((error) => console.log("Sound couldn't be played:", error));
    }
    // 次の文字がスペース,?,!,',.,の場合、表示する
    const nextCharacter = englishDisplay.children[currentCharacterIndex].innerText;
    if (exclude_pattern.includes(nextCharacter)) {
      console.log(currentCharacterIndex);
      console.log(nextCharacter);
      englishDisplay.children[currentCharacterIndex].style.display = "inline";
      currentCharacterIndex++;
    }
    // 全ての文字が表示されているか確認する
    if(checkAllCharactersDisplayed()) {
      // エラー処理の追加
      correctSound.volume = 0.4;
      correctSound.currentTime = 0;
      correctSound.play().catch((error) => console.log("Sound couldn't be played:", error));
      judge.innerText = "正解です！";  // すべての文字が表示されている場合
      toggleAnswer("inline-block");
    }
  }
});

/**
 * 非同期でバックエンドから英文を取得する
 */
function GetRandomSentence() {
  return fetch(RANDUM_SENTENCE_RUL_API)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => ({
      english: data.english_sentence,
      japanese: data.japanese_sentence,
      audio: data.audio_file,
    }))
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
};

/**
 * 取得した英文を1文字ずつに分割して正誤チェックできるようにする
 */
async function RenderNextSentence() {
  count++;
  counter.innerText = 'Question: ' + count;
  
  const sentence = await GetRandomSentence();
  englishDisplay.innerText = "";
  openHere.innerText = sentence.japanese;
  audioFile = new Audio(sentence.audio);  // オーディオファイルのURLを使ってAudioオブジェクトを作成します
  console.log(sentence.english);
  /* 文章を1文字ずつ分解して、spanタグを生成する */
  let splitCharacter = sentence.english.split("")
  splitCharacter.forEach((character) => {
    const spanField = document.createElement("span");
    spanField.innerText = character;
    spanField.style.display = "none";  // 初めて非表示にする
    englishDisplay.appendChild(spanField);
  });
  currentCharacterIndex = 0;
  playAudioFile()
};

/**
 * 次の問題に進む
 */
function nextQuestion(){
  RenderNextSentence();
  toggleAnswer("none");
  judge.innerText = ""
}

/**
 * もう一度
 */
function onceAgain() {
  englishDisplay.style.display = "none";
  judge.innerText = "";
  toggleAnswer("none");
  playAudioFile();
}

/* 英文を呼び出す */
let count = 0;
RenderNextSentence();