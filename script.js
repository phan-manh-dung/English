
// đọc từ vựng
function speakText(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'en-US';
    speech.text = text;
    window.speechSynthesis.speak(speech);
}

