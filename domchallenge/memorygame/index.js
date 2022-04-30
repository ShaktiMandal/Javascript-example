const gameArea = document.getElementById('gamearea');
const inputblock = document.getElementById('blockno');
const configure = document.getElementById('configure');
const startBtn = document.getElementById('startgame');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highscore');
const blocks = document.getElementById('blocks');


let userSelectionBlocks = [];
let systemSelectionBlocks = [];
let level = 1
let score = 0;
let highScore = 0;
let noOfSelectionToMake = 0;

const isThereMatch = (selectedId) => {

    return systemSelectionBlocks.findIndex(item => item === selectedId) !== -1;
}

const onSelection = (event) => {
   let selectedId = event.target.id;
   userSelectionBlocks.push(selectedId);
   gameArea.style.animation = "none";
   if(isThereMatch(selectedId))
   {
        noOfSelectionToMake = noOfSelectionToMake + 1;
        event.target.classList.add("rightselection");
        if(noOfSelectionToMake === level)
        {
            noOfSelectionToMake = 0;
            highScore = highScore + 1;
            score = score + 1;
            level = level + 1;
            scoreElement.textContent = score.toString();
            systemSelectionBlocks = [];
            userSelectionBlocks = [];
            highLightBlock();
        }
        startBtn.disabled = true;
   }
   else
   {
        event.target.classList.add("wrongselection");
        const timeoutHandler = setTimeout(()=> {
            console.log("Timeout occured");
            event.target.classList.remove("wrongselection");
            clearTimeout(timeoutHandler);
        }, 500)
        gameArea.classList.add("animategamearea");
        requestAnimationFrame(()=> gameArea.style.animation = "shake 0.8s ease-in-out");
        userSelectionBlocks = [];
        systemSelectionBlocks = [];
        score = 0;
        if(localStorage.getItem('highScore') < highScore)
        {
            localStorage.setItem("highScore", highScore);
            highScore = 0;
        }
        startBtn.disabled = false;
   }
}
const configureGameBoard  = () => {
    gameArea.innerHTML = "";
    let noOfBlock = inputblock.value;
    if(noOfBlock > 2)
    {
        blocks.classList.add('displayblocksarea');
        for(let index = 0; index < noOfBlock; index++)
        {
            const div = document.createElement('div');
            div.id = index.toString();
            div.classList.add('block');
            div.addEventListener('click', onSelection);
            gameArea.appendChild(div);
        }
    }
}

const highLightBlock = () => {

    for(let index = 0; index < level; index++)
    {
        let randomIndex = Math.floor(Math.random() * gameArea.children.length);
        if(randomIndex <= gameArea.children.length - 1)
        {
            console.log(`id - ${randomIndex}`);
            let choosenBlock = document.getElementById(randomIndex.toString());
            systemSelectionBlocks.push(randomIndex.toString());
            console.log(choosenBlock);
            choosenBlock.style.background = "green";
             const timeoutHandler = setTimeout(()=> {
                 choosenBlock.style.background = "none";
                 clearTimeout(timeoutHandler);
             }, 300)
        }
    }
}

const onStartGame = () => {
    startBtn.disable = true;
    highLightBlock();
}

const handleInput  = (event) => {

    if(event.target.value.length === 0)
    {
        blocks.classList.remove('displayblocksarea');
    }
}

const initialize = () => {
    configure.addEventListener('click', configureGameBoard);
    startBtn.addEventListener('click', onStartGame);
    inputblock.addEventListener('input', handleInput);

    highScoreElement.textContent = 0;

    if(!localStorage.getItem('highScore') )
    {
        localStorage.setItem("highScore", highScore);
    }
    else
    {
        highScoreElement.textContent = localStorage.getItem('highScore')
    }

    scoreElement.textContent = 0;
}

initialize();
