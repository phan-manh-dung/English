
// đọc từ vựng
function speakText(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'en-US';
    speech.text = text;
    window.speechSynthesis.speak(speech);
}

// thêm từ vựng
document.addEventListener('DOMContentLoaded', (event) => {
    // lấy ds từ vựng đã lưu từ local storage
    function getSavedVocabulary() {
        const savedVocabulary = localStorage.getItem('vocabulary');
        return savedVocabulary ? JSON.parse(savedVocabulary) : [];
    }

    // lưu từ vựng vào local storage
    function saveVocabularyToLocalStorage(vocabulary) {
        localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
    }

    // biễu mẫu để lấy từ vựng và nghĩa ở local storage ra
    function addVocabularyToList(word, meaning) {
        const span = document.createElement('span');
        span.setAttribute('onclick', `speakText('${word}')`);
        
        const strong = document.createElement('strong');
        strong.className = 'strong';
        strong.textContent = `- ${word}`;

        span.appendChild(strong);
        span.innerHTML += `: ${meaning}`;

        vocabularyList.appendChild(span);
        vocabularyList.appendChild(document.createElement('br'));
    }

     // lấy dữ liệu đã lưu từ local storage và truyền vào addVocabularyToList
    let savedVocabulary = getSavedVocabulary();
    savedVocabulary.forEach(item => {
        addVocabularyToList(item.word, item.meaning);
    });

    // các biến
    const inputWord = document.getElementById('input-word');
    const inputMeaning = document.getElementById('input-meaning');
    const addVocabulary = document.getElementById('add-vocabulary');
    const vocabularyList = document.getElementById('vocabulary-list');

    addVocabulary.addEventListener('click', () => {
        const valueWord = inputWord.value.trim();
        const valueMeaning = inputMeaning.value.trim();

        if (valueWord && valueMeaning) {
            // thêm từ vựng vào local storage và hiển thị ra màn hình
            addVocabularyToList(valueWord, valueMeaning);
            savedVocabulary.push({ word: valueWord, meaning: valueMeaning });
            saveVocabularyToLocalStorage(savedVocabulary);

            inputWord.value = '';
            inputMeaning.value = '';
        } else {
            alert('Please fill in both word and meaning fields.');
        }
    });
});
