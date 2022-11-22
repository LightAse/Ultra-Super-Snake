/*
    * Board
*/
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;


/*
    * Snake Head
*/
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var cantFood = 0;
var actualFood = 0;

var puntitos = 0;

var UserColor = "default";

var email =  "lschainder@gmail.com" || localStorage.getItem("email");


/*
    * Food
*/
var foodX;
var foodY;


var gameOver = false;

function updateUserScore(puntitos){

        const page = "http://localhost:5000/post/email";

        fetch(page, {
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: "lschainder@gmail.com",
            }), 
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                alert("Error Password or Username"); /*displays error message*/
                } else {
                    console.log(data["id"]);
                    
                    page = "http://localhost:5000/up/:id/ovscore"

                    fetch(page, {
                        method: "POST",
                        headers:{
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            id: data["id"],
                            score: puntitos,
                        }), 
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.error) {
                            alert("Error Password or Username"); /*displays error message*/
                            } else {
                               
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    
                    /*opens the target page while Id & password matches*/

                }
            })
            .catch((err) => {
                console.log(err);
            });

}


function getColor(){

    if(UserColor == "default"){
        return "lime";
    }

    if(UserColor == "invisible"){

        return "black";
    }

    if(UserColor == "colorblind"){

        return "white";
    }

    if(UserColor == "admin"){

        return "yellow";
    }

    if(UserColor == "secret color"){

        return "violet";
    }

    return "pink";

}

function reload() {
    
    window.location.reload();

}

function calculatePoints(){

    /*
    * 1 apple = 1
    * 10 apples = score * 1.2
    * 100 apples = score * 2
    */
   
    var x = cantFood / 10;

    for(var i = 0; i < x; i++){

        puntitos *= 1.2;

    }

    if(actualFood % 100 == 0){

        puntitos *= 2;

    }

    puntitos = Math.floor(puntitos);

}

function updateScore(){

    const foodScorePara = document.getElementById("foodScore");
    const pointScorePara = document.getElementById("pointScore");

    foodScorePara.textContent = `Food: ${cantFood}`;
    pointScorePara.textContent = `Points: ${puntitos}`;

}


window.onload = function(){

    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d"); //use for drawing on the board
    

    placefood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update,1000/10); /* 100 millisecons */
    
    
}


function update(){



    if(gameOver){
        
        return;

    }


    
    context.fillStyle ="black"; 
    context.fillRect(0,0, board.width, board.height);


    context.fillStyle="red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if(snakeX == foodX && snakeY == foodY){

        snakeBody.push(foodX,foodY);
        placefood();
        cantFood++;
        puntitos+=10;

    }

    for(let i = snakeBody.length-1; i>0; i--){

        snakeBody[i] = snakeBody[i-1];

    }
    if(snakeBody.length){

        snakeBody[0] = [snakeX,snakeY];
    }

    context.fillStyle=getColor();
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX,snakeY, blocksize, blocksize);
    for(let i = 0; i < snakeBody.length; i++){

        context.fillRect(snakeBody[i][0], snakeBody[i][1],blocksize,blocksize);

    }

    /*
        * Game Over conditions
    */

    updateScore();

    if(snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows*blocksize){

        gameOver = true;
        calculatePoints();
        updateScore();

    }

    for(let i = 0; i < snakeBody.length; i++){

        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){

            gameOver = true;
            calculatePoints();
            updateScore();
        }

    }

}

function changeDirection(e){

    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;

    }

    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;

    }

    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;

    }

    else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;

    }

}





function placefood(){

    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * cols) * blocksize;

}


