export const RANDUM_SENTENCE_RUL_API: string =
	"https://endictation.onrender.com/api/dictation/random/";
export const EXCLUDE_PATTERN: string[] = [
	" ",
	"?",
	"!",
	"'",
	".",
	",",
	"？",
	"！",
	"-",
];
export const OPEN_TEXT: string =
	'日本語訳を見る <i class="fa-solid fa-toggle-on"></i><br>（Enter）';
export const CLOSE_TEXT: string =
	'日本語訳を隠す <i class="fa-solid fa-toggle-off"></i><br>（Enter）';

// HTMLElement | null : 要素が存在しない場合にnullを返す可能性があるため
export const typingInput: HTMLElement | null =
	document.getElementById("typingInput");
export const openHere: HTMLElement | null = document.getElementById("openHere");
export const questionNumber: HTMLElement | null =
	document.getElementById("questionNumber");
export const hidden: HTMLElement | null = document.getElementById("hidden");
export const englishDisplay: HTMLElement | null =
	document.getElementById("englishDisplay");

export const typingSound: HTMLAudioElement = new Audio(
	"/static/app/audio/audio_typing-sound.mp3"
);
export const correctSound: HTMLAudioElement = new Audio(
	"/static/app/audio/audio_correct.mp3"
);
export const wrongSound: HTMLAudioElement = new Audio(
	"/static/app/audio/audio_wrong.mp3"
);
