let answer = '';
let answerState = '';
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {
    mistakesCount = 0;
    lettersState = getDefaultKeyboard();
    drawPerson(mistakesCount);
    drawBoard(lettersState);
    generateWord();
}

function generateWord() {
    let indexWord = Math.floor(Math.random() * dictionary.length);
    answer = dictionary[indexWord];
    answerState = '*'.repeat(answer.length);
    drawAnswerState(answerState);
}

function onKeyClick(letter) {

    if (mistakesCount === 7) {
        alert('Вы проиграли, загаданное слово ' + answer);
        startGame();
        return;
    }
    let letterFromState = '';
    let letterChar = letter.toLowerCase();

    for (let i = 0; i < lettersState.length; i++) {
        if (lettersState[i].char === letterChar) {
            letterFromState = lettersState[i];
            break;
        }
    }

    if (!answer.includes(letterFromState.char) && !letterFromState.error) {
        mistakesCount += 1;
        letterFromState.error = true;
    }
    if (answer.includes(letterFromState.char) && !letterFromState.success) {
        arrayAnswerState = answerState.split('');
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] === letterChar) {
                arrayAnswerState[i] = letterChar;
            }

        }
        answerState = arrayAnswerState.join('');
        letterFromState.success = true;
    }
    drawPerson(mistakesCount);
    drawBoard(lettersState);
    drawAnswerState(answerState);

    if (answerState === answer) {
        winGame();
    }
}