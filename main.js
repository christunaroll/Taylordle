document.addEventListener("DOMContentLoaded", () => {
    // functions
    createSquares();
    addKeyboardClicks();

    //variables
    let guessedWords = [[]]; //array of arrays to keep track of words guessed
    let availableSpace = 1;
    let guessedWordCount = 0;
    let word;
    let tsArray = [
        "dress",
        "swift",
        "lover",
        "romeo",
        "lorax",
        "style",
        "becky",
        "clean",
        "piano",
        "crime",
        "death",
        "disco",
        "heart",
        "happy",
        "lakes",
        "lucky",
        "movie",
        "peace",
        "ready",
        "seven",
        "shake",
        "smile",
        "speak",
        "tears",
        "white",
        "horse",
        "woods",
        "coney",
        "exile",
        "paper",
        "rings",
        "grace"];
    
    // get a new word
    getNewWord();
    function getNewWord() {
        word = tsArray[Math.floor(Math.random() * tsArray.length)];
    }

    // so you know which array (row) you're on
    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1]; // returns array that we are updating 
    }

    // update the square of words user guessed
    function updateGuessedLetters(letter) {
        const currentWordArr = getCurrentWordArr();

        // check to make sure the array isnt filled up yet
        // if not, add to array and display onto box
        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));

            // update onto the next space location
            availableSpace = availableSpace + 1;
            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);
    
        if (!isCorrectLetter) {
          return "#AFAA94"; // grey
        }
    
        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;
    
        if (isCorrectPosition) {
          return "#3C6248"; // green
        }
    
        return "rgb(181, 159, 59)"; //yellow
      }


    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();

        // if user enters word less than 5 length and hits enter
        if (currentWordArr.length !==5) {
            window.alert("Word must be 5 letters!");
            return;
        }

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
          setTimeout(() => {
            const tileColor = getTileColor(letter, index);

            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX"); // flip after you press enter
            letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
          }, interval * index);
        });

        guessedWordCount += 1;

        // if user correctly guesses the word
        const currentWord = currentWordArr.join('');
        if (currentWord === word) {
            window.alert("CONGRATULATIONS! TS would be proud :)");
        }

        // if they lost
        if (guessedWords.length === 6) {
            window.alert("Sorry! You have no more guesses! The correct word is ${word}.");
        }

        // move onto next array if none of the above applied
        guessedWords.push([]);
    }

    function handleDeleteLetter() {
        //get current array and mutate existing array
        const currentWordArr = getCurrentWordArr();
        if (!currentWordArr.length) {
            return;
        }
        currentWordArr.pop();
      
        //update to the square and text content and make space for the deleted space
        guessedWords[guessedWords.length - 1] = currentWordArr;
        const lastLetterEl = document.getElementById(availableSpace - 1);
        lastLetterEl.innerHTML = "";
        availableSpace = availableSpace - 1;
      }
    
    // create 5 x 6 squares 
    function createSquares() {
        const gameBoard = document.getElementById("board");
    
        for (let index = 0; index < 30; index++) {
          let square = document.createElement("div");
          square.classList.add("square");
          square.setAttribute("id", index + 1);
          square.classList.add("animate__animated");
          gameBoard.appendChild(square);
        }
    }

    // iterate over each key, add an on click handler
    // for each key, get data (letter) of each key  
    function addKeyboardClicks() {
        const keys = document.querySelectorAll(".keyboard-row button");
        for (let i = 0; i < keys.length; i++) {
          keys[i].addEventListener("click", ({ target }) => {
            const key = target.getAttribute("data-key");
    
            if (key === "enter") {
              handleSubmitWord();
              return;
            }
    
            if (key === "del") {
                handleDeleteLetter();
              return;
            }
    
            updateGuessedLetters(key);
          });
        }
      }

})

/* THINGS TO ADD
    still need to add api list of invalid words 
   + still need to change color of keyboard once you use it
   + connect keyboard to keys on screen
 */