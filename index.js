const boxes = document.querySelectorAll(".box");
const game = document.querySelector(".gameInfo");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=> {
        box.innerText ="";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
        box.classList.remove("win");
    })
    newGamebtn.classList.remove("active");
    game.innerText = `Current Player - ${currentPlayer}`;
} 
initGame();
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer="X";
    }
    game.innerText = `Current Player - ${currentPlayer}`;
}
function handleClick(index){
    if(gameGrid [index] ===""){
       boxes[index].innerText = currentPlayer ;
       gameGrid[index]=currentPlayer;
       boxes[index].style.pointerEvents = "none";
           // swap turn
    swapTurn();
    // check if someone wins the game
    checkGameOver();
    }
}
boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});
function checkGameOver(){
let answer = "";
winningPosition.forEach((position) =>{
    // all 3 boxes should be non-empty and the values should be same
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !== "")
    && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]] )){
// to check who is the winner
if(gameGrid[position[0]] === "X")
answer = "X"
else 
answer = "O"
// disable pointer events
boxes.forEach((box) =>{
    box.style.pointerEvents = "none";
}
)
boxes[position[0]].classList.add("win");
boxes[position[1]].classList.add("win");
boxes[position[2]].classList.add("win");

    }
});
// we have a winner
if(answer !== ""){
game.innerText = `Winner Player - ${answer}`;
newGamebtn.classList.add("active");
return;
}
// tie
let fillCount =0;
gameGrid.forEach((box) => {
    if( box !== ""){
        fillCount++;
    }
});
if(fillCount===9){
    game.innerText= "Game Tie";
    newGamebtn.classList.add("active");
}
}
newGamebtn.addEventListener("click",initGame);