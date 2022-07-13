const allBtnElements = document.querySelectorAll('button');
let row = 1;
let letter = 1;
let wordList = [];
let gameOver = false;
let guessedCorrectly = false;
// document.getElementById("btnsub").disabled = true;
let commonWords = ["prank", "about", "above", "maths", "magic", "mouse", "paint", "white", "abase"
    , "aback", "acids", "admit", "after", "agile", "allow", "ankle", "angry", "among",
"maple","march","masks",'mates',"meals","means","nicer"]
let wordForDay = commonWords[Math.floor(Math.random() * commonWords.length)];
console.log(wordForDay)
let wordElements = document.querySelectorAll('.word-row');
allBtnElements.forEach((elements) => {
    elements.addEventListener('click', function() {
        keypress(elements.attributes["data-key"].value)
    });
})

function populateWord(key) {
    if (letter < 6) {
        wordElements[row - 1].querySelectorAll('.word')[letter - 1].innerHTML = key;
        letter += 1;
        wordList.push(key);
    }
}

function deleteLetter() {
    const deleteletter = wordElements[row - 1].querySelectorAll('.word');
    console.log(deleteletter);
    for (let index = deleteletter.length - 1; index >= 0; index--) {
        const element = deleteletter[index];
        if (element.innerText !== '') {
            element.innerText = '';
            wordList.pop(index);
            letter -= 1;
            break;
        }

    }
}
async function getMeaningFullWord(letter) {
    let word = letter.reduce((acc, current) => acc += current).toLowerCase();
    let res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let data = await res.json();
    if (data['title'] == 'No Definitions Found') {
        alert('Please enter meaningfull word.');
    } else if (data[0]['word'] === word && data[0]['word'] !== undefined) {
        checkWord()
        wordList.length = 0;
    } else {
        alert('Please enter meaningfull word.');
        wordList.length = 0;
    }

}

function keypress(key) {
    if (!gameOver) {
        if (key.toLowerCase() === 'enter') {
            letter < 6 ? alert('Not enough letters'):  getMeaningFullWord(wordList)
        } else {
            key.toLowerCase() === 'del' ?   deleteLetter():  populateWord(key)
        }
    } else {
        alert('Game over ! Please play again tomorrow and guess a new word');
    }

}

function checkWord() {
    let numOfCorrectAlph = 0;
    const letterElements = wordElements[row - 1].querySelectorAll('.word')
    letterElements.forEach((elements, index) => {
        const indxofletter = wordForDay.toLowerCase().indexOf(elements.innerText.toLowerCase());
        if (indxofletter === index) {
            elements.classList.add('word-green')
            numOfCorrectAlph += 1;
        } else if (indxofletter > index) {
            elements.classList.add('word-yellow')
        } else {
            elements.classList.add('word-grey')
        }
    })
    if (numOfCorrectAlph === 5) {
        gameOver = true;
        guessedCorrectly = true;
        // document.getElementById("btnsub").disabled = false;
        alert('You are the winner for today’s game. Keep learning new word everyday.');

    } else if (row === 6) {
        gameOver = true;
        alert('Better Luck next time. The word was:' + wordForDay.toUpperCase())
    }
    row += 1;
    letter = 1;
}

async function getUserScore()
{
    debugger;
    try {
            if (guessedCorrectly) {
        let res = await fetch(`http://34.205.68.207:3000/api/userDetails`,
            { method: 'POST', body:JSON.stringify( { "USER_NAME":localStorage.getItem('name'),"USER_EMAIL":localStorage.getItem('email'),
                "SCORE_COUNT": 10
            }),
                mode: 'cors',
    headers: {
      'Content-Type': 'application/json'

    }
        });
        let data = await res.json();
        if (data['status'] == 200) {
            alert('Score submitted successfully.')
             localStorage.clear();
            guessedCorrectly = false;
        } else {
            alert('Internal Server Error.');
        }
    }

    } catch {
alert('Service Down.');
}
}
