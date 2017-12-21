var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement'),
    winnerName = document.getElementById('js-winnerName');

function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            winnerName.style.display = 'none';
            break;
        case 'ended':
            newGameBtn.innerText = 'One more time?';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}
setGameElements(); //po co to sie tutaj znajduje ????

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Please enter your name', 'Player name');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints();
        
        playerPickElem.innerHTML = "Player selection";
        playerResultElem.innerHTML = "Player Score";
        computerPickElem.innerHTML = "Computer selection";
        computerResultElem.innerHTML = "Computer Score";
        playerResultElem.style.color = computerResultElem.style.color = '#ffffff';
    }
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() *3 )];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
}

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';
    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {
        winnerIs = 'computer';
    }
    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "You win!";
        playerResultElem.style.color='green';
        computerResultElem.innerHTML = "You lose!";
        computerResultElem.style.color='red';
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "You win!";
        computerResultElem.style.color='green';
        playerResultElem.innerHTML = "You lose!";
        playerResultElem.style.color='red';
        computer.score++;
    } else {
        playerResultElem.innerHTML = computerResultElem.innerHTML = "Draw";
        playerResultElem.style.color='orange';
        computerResultElem.style.color='orange';
    }
    setGamePoints();
    winnerOfTheGame();
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
    
}


function afterWin() {
    pickElem.style.display = 'none';
    setTimeout(function(){
        gameState = "ended";
        setGameElements();
    }, 4000);
}

function winnerOfTheGame() {
    if (player.score == 10) {
        winnerName.style.display = 'block';
        winnerName.innerHTML = player.name + " Win!";
        afterWin();
    } else if (computer.score == 10) {
        winnerName.style.display = 'block';
        winnerName.innerHTML = "You lose!!";
        afterWin();
    }
}




























