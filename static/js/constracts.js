export const RANDUM_SENTENCE_RUL_API = "https://endictation.onrender.com/api/dictation/random/";
export const EXCLUDE_PATTERN = [' ', '?', '!', '\'', '.', ',', '？', '！', '-'];
export const OPEN_TEXT = '日本語訳を見る <i class="fa-solid fa-toggle-on"></i><br>（Enter）';
export const CLOSE_TEXT = '日本語訳を隠す <i class="fa-solid fa-toggle-off"></i><br>（Enter）';

export const typingInput = document.getElementById("typingInput");
export const openHere = document.getElementById("openHere");
export const questionNumber = document.getElementById("questionNumber");
export const hidden = document.getElementById("hidden");
export const englishDisplay = document.getElementById("englishDisplay");

export const typingSound = new Audio("/static/app/audio/audio_typing-sound.mp3");
export const correctSound = new Audio("/static/app/audio/audio_correct.mp3");
export const wrongSound = new Audio("/static/app/audio/audio_wrong.mp3");
