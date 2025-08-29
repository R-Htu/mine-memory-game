// ================================
// ⌐■-■   Game State Variables 
// ================================
let firstPick = null;
let secondPick = null;
let count = 0;
let score = 0;
let seconds = 0;
let minutes = 0;
let intervalId = null;
let isBoardLocked = true;

// ================================
// (⌐■_■) DOM Elements 
// ================================
const startBtn = document.querySelector('.start button');
const box = document.querySelector('.box');
const scoreSpan = document.querySelector('.score span');
const countSpan = document.querySelector('.count span');
const timer = document.querySelector('.timer span');

// ================================
// (¬‿¬) Images for the Memory Game 🌸
// ================================
const images = [
    "https://i.ibb.co/4ZVKZnRT/german-flower16.jpg",
    "https://i.ibb.co/pVGgXpg/german-flower10.jpg",
    "https://i.ibb.co/HpDg0FGf/german-flower5.jpg",
    "https://i.ibb.co/MDwTB19Y/german-flower8.jpg",
    "https://i.ibb.co/C5R5X9jH/german-flower12.jpg",
    "https://i.ibb.co/0RwBQHD0/german-vegie7.jpg"
];
const totalImages = [...images, ...images];

// ================================
// (ᗒᗜᗕ)՛̵̖   Functions 🔧
// ================================

//(ಥ﹏ಥ) Shuffle images array 🎲
function shuffleImage(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function gameCount() {
    countSpan.textContent = count;
}

function gameScore() {
    scoreSpan.textContent = score;
}


//(☉_☉) Render game cards in the box 🃏
function showGameBox() {
    box.innerHTML = "";
    totalImages.forEach(img => {
        const card = document.createElement('div');
        card.classList.add('card');

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');

        const image = document.createElement('img');
        image.src = img;

        back.appendChild(image);
        card.appendChild(front);
        card.appendChild(back);
        box.appendChild(card);

        card.addEventListener('click', startGame);
    });
}

//  (ノಠ益ಠ)ノ彡┻━┻ logic 🖱
function startGame() {
    if (isBoardLocked || this.classList.contains('active')) return;

    this.classList.toggle('active');

    if (!firstPick) {
        firstPick = this;
        return;
    } 
        count++;
        gameCount();
        secondPick = this;

        if(firstPick.querySelector('.back img').src === secondPick.querySelector('.back img').src){
            score++;
            gameScore();
            if (score === 6) {
                let message = "";
                const time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            
                if (count < 7) {
                    message = `🎉 Impossible mode! I bet you can’t do better, can you? If you can, you're a memory master! Only ${count} tries and your time was ${time}!`;
                } else if (count < 10) {
                    message = `😎 Not bad! You remembered most of them! Tries: ${count}, Time: ${time}.`;
                } else {
                    message = `🤔 Oops! Looks like you need more memory training. Tries: ${count}, Time: ${time}.`;
                }
            
                setTimeout(() => {
                    confirm(message);
                    restartGame(); // safer than stopGame()
                }, 200);
            }

            firstPick = null;
            secondPick = null;

        } else {
            isBoardLocked = true;
            setTimeout(() => {
                firstPick.classList.remove('active')
                secondPick.classList.remove('active');
                firstPick = null;
                secondPick = null;
                isBoardLocked = false;
            }, 1000);
        }
      
    }

    function startTimer() {
        if(!intervalId) {
           intervalId = setInterval(() => {
                seconds++;
                if(seconds === 60) {
                    minutes++;
                    seconds = 0;
                }
                timer.textContent = `${minutes<10? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;
            }, 1000);
        }
    }

    function restartGame() {
        clearInterval(intervalId)
        intervalId = null;
        score = 0;
        count = 0;
        seconds = 0;
        minutes = 0; 
        timer.textContent = "00:00";
        scoreSpan.textContent = score;
        countSpan.textContent = count;
         
        firstPick = null;
        secondPick = null;

        shuffleImage(totalImages);
        showGameBox();
        isBoardLocked = true;
        startBtn.style.color = "#0505f0ff"
        startBtn.textContent = "Start";

    }


// ================================
// (─‿‿─) Event Listeners 
// ================================

// ================================
// ( ~_~') Preview Cards 
// ================================

function previewCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card =>card.classList.add('active'));
    
    setTimeout(() => {
        cards.forEach(card=>card.classList.remove('active'));
        isBoardLocked = false;
    }, 1000);
}

startBtn.addEventListener('click', () => {
    if(startBtn.textContent === "Start") {
        isBoardLocked = false;
        startBtn.style.color = "#f5ffad"
        startBtn.textContent = "Stop";
        previewCards();
        startTimer();

    }else {
        restartGame();
    }
});

// ================================
// (ಠ_ಠ) Initialize Game 🚀
// ================================
shuffleImage(totalImages);
showGameBox();

    