const arrayImages2 = [
    'images2/lemon.jpg',
    'images2/lemon.jpg',
    'images2/apple.jpg',
    'images2/apple.jpg',
    'images2/banana.jpg',
    'images2/banana.jpg',
    'images2/strawberry.jpg',
    'images2/strawberry.jpg',
    'images2/cherry.jpg',
    'images2/cherry.jpg',
    'images2/carrot.jpg',
    'images2/carrot.jpg',
    'images2/grapes.jpg',
    'images2/grapes.jpg',
    'images2/pear.jpg',
    'images2/pear.jpg',
    'images2/kiwi.jpg',
    'images2/kiwi.jpg'
];

const cardsContainer = document.querySelector('.container');
const cards = document.querySelectorAll('img');
const button = document.querySelector('button');
const attempts = document.querySelector('span');
const box = document.querySelector('.box');
const time = document.querySelector('#time');

let cardArray = [];
let attempt = 0;
let matches = 0;
let count = 0;
let hour = 0;
let minute = 0;
let second = 0;
let clockRun = false;
let clockID;


// Fisher-Yates shuffle:

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      //return array;
    }
  };
  shuffle(arrayImages2);


function startClock() {
    clockID = setInterval(function() {
        second++; 
        if (second === 60) { 
          minute++; 
          second = 0; 
        } if (minute === 60) {
          hour++;
          minute = 0;
        }
        time.innerHTML = `${minute}m : ${second}s`;
      }, 1000);
    };

cards.forEach(itemCards => {
    itemCards.addEventListener('click', e => {
        if (!clockRun) {
            startClock(); //Call this function to run the timer after the first click
            clockRun = true;
        };
        
        e.target.src = arrayImages2[e.target.id];
        cardArray.push(e.target);
        if(cardArray.length === 2) {
            if(cardArray[0].src === cardArray[1].src) {
                cardArray.length = 0;
                matches++;
                attempt++;
                setTimeout(() => {
                    if(matches === 9) {
                        clearInterval(clockID);
                        box.style.display = 'block';
                        matches = 0;
                        boxItem();
                        //alert(`you mathed all the cards with ${attempt} attempts!`);
                        attempt = 0;
                    }
                });
            } else {
                attempt ++;
                setTimeout(() => {
                    cardArray.forEach(item => {
                        item.src = 'images2/pattern.jpg';
                    });
                    cardArray.length = 0;
                }, 600);
            }
        }
        attempts.innerText = `${attempt}`;
    });
});

function newGame() {
    location.reload(); // reloads the page
  }

button.addEventListener('click', newGame);
 
function boxItem() {
    box.innerHTML = `
        <span id="close">x</span>
        <h4><b>Congratulation you won!</b></h4>
        <p><b>You finished the game in:</b> <span>${attempt}</span> <b>moves<b></p>
        <p><b>Time passed: ${minute}m : ${second}s</b></p>
        `;
        document.querySelector('#close').addEventListener('click', () => {
            box.style.display = 'none';
            newGame();
        });
};

