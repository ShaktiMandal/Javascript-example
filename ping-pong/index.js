const gamecanvas = document.getElementById("gamecanvas");
const gameContext = gamecanvas.getContext('2d');

let keyUpPressed;
let keyDownPressed;

var userPaddle = {
    height : 50,
    width  : 10,
    position : {
        y: (gamecanvas.height/2) - 10,
        x: 5
    },
    move: (currentPos) => {
        
    },
    color: "#fff",
    score: 0
}

var paddle = {
    height : 50,
    width  : 10,
    position : {
        y: (gamecanvas.height/2) - 10,
        x: (gamecanvas.width - 15)
    },
    move: (currentPos) => {
        
    },
    color: "#fff",
    score: 0
}

var net = {
    height: gamecanvas.height,
    width:  5,
    position: {
        x: (gamecanvas.width/ 2) - 10,
        y: 0
    },
    color: "#fff"    
}

var ball = {
    radius: 7,
    speed: 5,
    position: {
        x: gamecanvas.width / 2,
        y: gamecanvas.height / 2
    },
    velocityX: 5,
    velocityY: 5,
    color: '#05EDFF'
}


var drawPaddle = function(position, color, width, height)
{
    gameContext.fillStyle = color;
    gameContext.fillRect(position.x, position.y, width, height);
}

var drawBall = function(position, color, radius)
{
    gameContext.fillStyle = color;
    gameContext.beginPath();
    gameContext.arc(position.x, position.y, radius, 0, Math.PI * 2, true);
    gameContext.closePath();
    gameContext.fill();
}

var drawNet = function(position, color, width, height)
{
    gameContext.fillStyle = color;
    gameContext.fillRect(position.x, position.y, height, width);
}

var render = function()
{    
    drawBall(ball.position, ball.color, ball.radius);
    drawPaddle(paddle.position, paddle.color, paddle.width, paddle.height);
    drawPaddle(userPaddle.position, userPaddle.color, userPaddle.width, userPaddle.height);
    drawNet(net.position, net.color,  net.height, net.width);
}

var update = function() 
{
    ball.position.x += ball.velocityX;
    ball.position.y += ball.velocityY;


    if(keyUpPressed && userPaddle.y > 0)
    {
        userPaddle.position.y -= 8;
    }
    else if(keyDownPressed && (userPaddle.position.y < (gamecanvas.height - userPaddle.height)))
    {
        userPaddle.position.y += 8;
    }


    if(ball.position.y >= (gamecanvas.height - 10))
    {
        ball.position.y -= ball.velocityY;
    }    
    
    if(ball.position.x >= gamecanvas.width)
    {
       userPaddle.score += 1;
    }

    if(ball.position.x <= 0)
    {
       paddle.score += 1;
    }


    if(isBallHitPaddle())
    {
         // default angle is 0deg in Radian
        let angle = 0;

        // if ball hit the top of paddle
        if (ball.y < (userPaddle.y + userPaddle.height / 2)) {
        // then -1 * Math.PI / 4 = -45deg
        angle = -1 * Math.PI / 4;
        } else if (ball.y > (userPaddle.y + userPaddle.height / 2)) {
        // if it hit the bottom of paddle
        // then angle will be Math.PI / 4 = 45deg
        angle = Math.PI / 4;
        }

        /* change velocity of ball according to on which paddle the ball hitted */
        ball.velocityX = (userPaddle === user ? 1 : -1) * ball.speed * Math.cos(angle);
        ball.velocityY = ball.speed * Math.sin(angle);

        // increase ball speed
        ball.speed += 0.2;
    }
}


var isBallHitPaddle = function()
{
    userPaddle.top = userPaddle.y;
  userPaddle.right = userPaddle.x + userPaddle.width;
  userPaddle.bottom = userPaddle.y + userPaddle.height;
  userPaddle.left = userPaddle.x;

  ball.top = ball.y - ball.radius;
  ball.right = ball.x + ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;

  return ball.left < userPaddle.right && ball.top < userPaddle.bottom && ball.right > userPaddle.left && ball.bottom > userPaddle.top;
}

var initializeAction = function() {
    
    const onKeyUp = function(e){

        console.log("key up pressed");
        switch(e.keyCode){
            case 38:
            {
                keyUpPressed: false;
                break;
            }
            case 40:
                {
                    keyDownPressed: false;
                    break;
                }
        }
    }

    const onKeyDown = function(e) {

        console.log("key up pressed");
        switch(e.keyCode){
            case 38:
            {
                keyUpPressed: true;
                break;
            }
            case 40:
                {
                    keyDownPressed: true;
                    break;
                }
        }
    }
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("keydown", onKeyDown);
}

var reset = function(){
    ball.position.x = gamecanvas.width/2;
    ball.position.y = gamecanvas.height/2;
    ball.speed = 7;

    ball.velocityY =- ball.velocityY;
    ball.velocityX =- ball.velocityX;
}

var startGame = function(){

    initializeAction();
    update();
    render();
}

setInterval(startGame, 1000/60);



