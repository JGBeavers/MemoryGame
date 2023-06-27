const gameContainer = document.getElementById('game');
let card1 = null;
let card2 = null;
let flippedCards = 0;
let noMatch = false;

const COLORS = [
    'red',
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'blue',
    'green',
    'orange',
    'purple',
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement('div');

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener('click', handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}

// TODO: Implement this function!
function handleCardClick(event) {
    if (noMatch) {
        return;
    }
    if (event.target.classList[1] === 'correct' || card1 === event.target) {
        return;
    }

    // you can use event.target to see which element was clicked
    //   console.log("you just clicked", event.target);
    //   let clickedCard = event.target;
    event.target.style.backgroundColor = event.target.classList[0];

    if (card1 === null) {
        card1 = event.target;
        return;
    }

    let correctColor = card1.classList[0];
    if (correctColor === event.target.classList[0]) {
        card1.classList.add('correct');
        card1.removeEventListener('click', handleCardClick);
        event.target.classList.add('correct');
        event.target.removeEventListener('click', handleCardClick);
        flippedCards += 2;
        console.log(flippedCards);
        card1 = null;
        noMatch = false;
        if (flippedCards === COLORS.length) {
            alert('game over!');
        }
        return;
    }

    noMatch = true;
    setTimeout(function () {
        card1.style.backgroundColor = 'white';
        event.target.style.backgroundColor = 'white';
        noMatch = false;
        card1 = null;
    }, 1000);
}

// when the DOM loads
createDivsForColors(shuffledColors);
