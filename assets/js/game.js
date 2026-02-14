import { WORDS } from "./words.js";
//eaten imbue vinyl lowly YAY WORDS ANAGRAM


const GAME_COUNT = 4;
let gamesRemaining = GAME_COUNT - 1;
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessStrings = ["eaten", "vinyl", "lowly", "imbue"]
console.log(rightGuessStrings)

let noCounter = 1;


function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function clearBoard() {
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.getElementsByClassName("letter-row")[i]
        for (let j = 0; j < 5; j++) {
            let box = row.children[j];
            box.textContent = '';
            box.style.removeProperty("background-color");
            box.className = "letter-box"
        }
    }
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        elem.style.removeProperty("background-color");
    }
}

function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, 'pulse');
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuessString = rightGuessStrings[(GAME_COUNT - gamesRemaining) - 1];
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        return
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Word not in list!")
        return
    }


    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = '#538d4e'
            } else {
                // shade box yellow
                letterColor = '#b59f3b'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(() => {
            //shade box
            animateCSS(box, 'flipInX');
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        setTimeout(() => {
            // toastr.success("You guessed right! Game over!")
            guessesRemaining = 0
            goToNextGame(guessString);
        }, 1500)
        return
    }
    else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("AWWW its okay!! lets refresh and try again.")
            toastr.error("The answers won't change, so dont worry :)")
        }
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            }

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        // const node = document.querySelector(element);
        const node = element
        node.style.setProperty('--animate-duration', '0.3s');

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });



document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        console.log("no guesses");
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        console.log("checking...")
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
        promptFinal();
    }

    document.dispatchEvent(new KeyboardEvent("keyup", { 'key': key }))
})

function initSolvedWords() {
    let container = document.getElementById("solved-words");
    let anagram = "eatenimbuevinyllowly"

    for (let i = 0; i < 4; i++) {
        let row = document.createElement("div")
        row.className = "solved-letter-row"

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            // box.textContent=anagram[i*5+j]
            row.appendChild(box)
        }

        container.appendChild(row)
    }
}

function initQuestionBoxes() {
    let container = document.getElementById("ask-question");
    let k;


    for (let i = 0; i < 6; i++) {
        let row = document.createElement("div")
        row.className = "final-answer-row"
        switch (i) {
            case 0:
                k = 4;
                break;
            case 1:
                k = 3;
                break;
            case 2:
                k = 2;
                break;
            case 3:
                k = 2;
                break;
            case 4:
                k = 9;
                break;
            case 5:
                k = 1;
                break;
        }
        for (let j = 0; j < k; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            // box.textContent=anagram[i*5+j]
            row.appendChild(box)
        }

        container.appendChild(row)

    }
}

function updateGameCounter() {
    let counter = document.getElementById("game-counter");
    notifHandler(GAME_COUNT - gamesRemaining);
    if (gamesRemaining < 0) {
        return;
    }
    else if (gamesRemaining < GAME_COUNT) {
        counter.textContent = (GAME_COUNT - gamesRemaining) + "/" + GAME_COUNT;
    }

}

function notifHandler(i) {
    toastr.options = {
        "closeButton": true,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "2000",
        "hideDuration": "1000",
        "timeOut": "-1",
        "extendedTimeOut": "-1",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    switch (i) {
        case 1:
            toastr.clear();
            toastr.info("Hi! Welcome to my game mwahaha");
            toastr.info("As you've probably noticed, today you'll be tasked with solving 4 wordles");
            toastr.info("It might seem like a challenge, but a wordle legend like you should be up to the task 👀");
            toastr.info("Plus, your trusty oomf will be here to back you up just in case :3");
            toastr.info("If you manage to solve all of them you'll be rewarded with the secret ooo");
            break;
        case 2:
            toastr.clear();
            toastr.success("WOOO first one down!! just three more to go,, YOU GOT THIS");
            toastr.info("This next one's pretty tricky, maybe some rarer letters,, hmmm");
            toastr.info("If you need a hint you can always ask oomf ^_^");
            break;
        case 3:
            toastr.clear();
            toastr.success("YAYYAYAYY you did it!! Halfway through and not even sweatin 👀 I'm IMPRESSED");
            toastr.info("Keep up the good work !! 2 more and you can unlock the secret hohoho")
            break;
        case 4:
            toastr.clear();
            toastr.success("DID 👀👀 DID ANYONE UM 👀👀👀👀 DID ANYONE SEE THATTT");
            toastr.info("You're doing amazing!! Just one more and you WIN!!");
            toastr.info("CAPITAL W WINNERR COMING UP YUPPPPP");
            break;
        case 5:
            toastr.clear();
            toastr.success("DING DING 🔔 DING 🔔🔔 DINGGGG 🔔🔔 WE HAVE A WINNERRRRR")
            toastr.success("THATS OWNFFFF GOOD JOB OHMYGODSHSHH WOOOO");
            toastr.success("YOU DID SOOOO WELL YOU'RE SO SMART SO AWESOME YAYYYYY WOOHOO");
            toastr.success("NOW FOR THE FINAL REVEALL 👀👀👀👀👀")
            promptFinal();
            break;
    }
};

function insertGuessIntoSolvedBox(string, pos) {
    let wordContainer = document.getElementsByClassName("solved-letter-row")[pos - 1]
    let letters = Array.from(string)
    for (let i = 0; i < letters.length; i++) {
        wordContainer.children[i].textContent = letters[i];
    }
}

function goToNextGame(string) {
    clearBoard();
    insertGuessIntoSolvedBox(string, GAME_COUNT - gamesRemaining);
    guessesRemaining = NUMBER_OF_GUESSES;
    gamesRemaining -= 1;
    nextLetter = 0;
    currentGuess = [];

    updateGameCounter();

    if (gamesRemaining < 0) {
        // setTimeout(() => {}, 1200);
        // unscrambleLetters();
        return;
    }
}

function unscrambleLetters() {

    let container = document.getElementById("ask-question");
    container.style.opacity = '1';

    setTimeout(() => {
        let string = "willyoubemyvalentine?";
        let letters = Array.from(string);
        let k = 0;
        for (let i = 0; i < 6; i++) {
            let container = document.getElementsByClassName("final-answer-row")[i];
            for (let j = 0; j < container.children.length; j++) {
                let delay = 250 * (k ^ 2);
                console.log("K: " + k + ", delay: " + delay);
                let box = container.children[j];
                let letter = letters[k];
                setTimeout(() => {
                    //shade box
                    animateCSS(box, 'flipInX');
                    box.textContent = letter;
                    removeTextFromAnswerBox(letter);
                    // box.style.backgroundColor = "#Fd9ed0";
                }, delay)

                k++
            }
        }
    }, 2650);


    setTimeout(() => {
        celebrate();
    }, 9000);
}

function removeTextFromAnswerBox(letter) {
    for (let i = 0; i < 4; i++) {
        let wordContainer = document.getElementsByClassName("solved-letter-row")[i]
        for (let j = 0; j < wordContainer.children.length; j++) {
            let box = wordContainer.children[j];
            if (box.textContent == letter) {
                box.textContent = '';
                console.log("removed: " + letter);
                return;
            }
        }
    }


}

function celebrate() {
    toastr.clear()
    toastr.options = {
        "closeButton": true,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "2000",
        "hideDuration": "1000",
        "timeOut": "-1",
        "extendedTimeOut": "-1",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
    }
    let o = 0.4;
    document.body.style.backgroundColor = "#d18fb1e3";
    document.getElementById("title").style.opacity = o;
    document.getElementById("game-counter").style.opacity = o;
    document.getElementById("game-board").style.opacity = o;
    document.getElementById("keyboard-cont").style.opacity = o * .75;

    document.getElementById("solved-words").style.visibility = 'hidden';
    document.getElementById("ask-question").style.transform = 'translate(0px,-100px)'


    setTimeout(() => {
        const container = document.getElementById("fireworks-container")
        const fireworks = new Fireworks.default(container)
        fireworks.start()
        toastr.success("^_^")

    }, 2650);

    setTimeout(() => {
        initAnswerButtons();
    }, 5000);


    setTimeout(() => {
        document.getElementById("sendai").style.opacity = 1;

    }, 10000);
    setTimeout(() => {
        document.getElementById("columbina").style.opacity = 1;
    }, 20000);

}

function promptFinal() {
    toastr.options = {
        "closeButton": true,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "2000",
        "hideDuration": "1000",
        "timeOut": "-1",
        "extendedTimeOut": "-1",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        onclick: function () { unscrambleLetters(); }
    }
    toastr.info("Click me when you're ready :)");
}

function initAnswerButtons() {
    let container = document.getElementById("answer-buttons");
    var yesButton = document.createElement("button");
    yesButton.innerText = "Yes !!!";
    yesButton.className = "yesButton"
    yesButton.id = "yesBtn";

    var noButton = document.createElement("button");
    noButton.innerText = "no";
    noButton.className = "noButton"
    noButton.id = "noBtn";


    container.appendChild(yesButton);
    container.appendChild(noButton);

    container.style.opacity = 1;
    noButton.style.opacity = 1;

    document.getElementById("yesBtn").addEventListener('click', () => { yayifyEverything(); });
    document.getElementById("noBtn").addEventListener('click', () => { noButtonClick(); });
}

function yayifyEverything() {
    document.getElementById('title').textContent = "YAAAAAAAAAAAAAAAYYYYY";
    document.getElementById('title').style.opacity = 1;

    let rows = document.getElementsByClassName("letter-row");
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].children.length; j++) {
            let gameRowsDelay = 120 * ((i * 5) + j);
            setTimeout(() => {
                let box = rows[i].children[j];
                if ((i == 0) && (j == 0)) {
                    box.textContent = "y";
                }
                else if ((i == (rows.length - 1)) && (j == (rows[i].children.length - 1))) {
                    box.textContent = "y";
                }
                else {
                    box.textContent = "a";
                }
            }, gameRowsDelay);
        }
    }

    let keyboardButtons = document.getElementsByClassName("keyboard-button");
    for (let i = 0; i < keyboardButtons.length; i++) {
        let keyboardButtonsDelay = 120 * i;
        setTimeout(() => {
            let button = keyboardButtons[i];
            if (i == 0) {
                button.textContent = "y";
            }
            else if (i == 27) {
                button.textContent = "y";
            }
            else {
                button.textContent = "a";
            }
        }, keyboardButtonsDelay);
    }
}

function noButtonClick() {
    let noBtn = document.getElementById("noBtn");
    let yesBtn = document.getElementById("yesBtn");
    // console.log("opacity: " + noBtn.style.opacity)
    noBtn.style.opacity = noBtn.style.opacity - 0.15;
    // console.log("opacity: " + noBtn.style.opacity)
    yesBtn.style.padding = (4 * noCounter) + "px";
    noCounter++;
}

initBoard()
initSolvedWords()
initQuestionBoxes()
updateGameCounter();

