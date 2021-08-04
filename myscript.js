const wrongLetterEl = document.getElementById('wrong-letters');
const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const figureParts = document.querySelectorAll('.figure-part');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-again');


const words = ['application',
  'programming',
  'interface',
  'wizard',
  'bunny',
  'bottle',
  'carnival',];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
    <span class="letter">${selectedWord[0]}</span>
    ${selectedWord
        .split('')
        .splice(1)
        .map(
            letter =>  `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`
            ).join('')
        }`;

        const innerWord = wordEl.innerText.replace(/\n/g,'');

        if (innerWord === selectedWord) {
            finalMessage.innerText = 'Congratulations! You won! 😃';
            popup.style.display = 'flex';
            autoStart();
        }

}

function displayNotification() {
    notification.classList.add('show');
    setTimeout ( () => 
        notification.classList.remove('show')
        ,3000);
}

function updateWrongLettersEl() {   
    wrongLetterEl.innerHTML = `
        ${wrongLetters.length === 0 ? '' :`<p>Wrong Letters:</p>`}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join(',')}
    `;

    figureParts.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }

    });

    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popup.style.display = 'flex';
        autoStart();
    }

}

//Event Listeners

document.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                displayNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                displayNotification();
            }
        }
    }
});

playAgainBtn.addEventListener('click', () => {

    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';

});

function autoStart() {
  setTimeout(() => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
  }, 2000);
}


displayWord();
