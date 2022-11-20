// useful to have them as global variables
var canvas, ctx, w, h;
var mousePos;

// an empty array!
var balls = [];
var initialNumberOfBalls;
var globalSpeedMultiplier = 0.5;
var colorToEat = 'red';
var wrongBallsEaten = goodBallsEaten = 0;
var numberOfGoodBalls;
let level = 1;
let nbVies = 5;
let score = 0;
let gameState = 'Launch the Game';
let playerImg = new Image();

//variables pour le timer
let timer;
let invulnerable = false;

var player = {
    x: 10,
    y: 10,
    width: 35,
    height: 35,
    color: 'red'
}

window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");

    // often useful
    w = canvas.width;
    h = canvas.height;

    // important, we will draw with this object
    ctx = canvas.getContext('2d');

    // start game with 10 balls, balls to eat = red balls
    startGame(level);

    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', mouseMoved);
    window.addEventListener('keydown', traiteToucheEnfoncee);

    // ready to go !
    mainLoop();
};

function traiteToucheEnfoncee(evt) {
    console.log(evt.key);
    if (evt.key === ' ') {
        if (gameState === 'Launch the Game') {
            gameState = 'PLAYING';
            
            level = 1;
            score = 0;
            nbVies = 5;
            startGame(level);
        }    
        else if (gameState === 'Game Over') {
            gameState = 'PLAYING';

            level = 1;
            score = 0;
            nbVies = 5;
            startGame(level);
        }
        else if (gameState === 'You Win') {
            gameState = 'PLAYING';

            level = 1;
            score = 0;
            nbVies = 5;
            startGame(level);
        }
    }
}

function startGame(level) {
    let nb = level + 1;
    timer = 160;
    do {
        balls = createBalls(nb);
        initialNumberOfBalls = nb;
        numberOfGoodBalls = countNumberOfGoodBalls(balls, colorToEat);
    } while (numberOfGoodBalls === 0);

    wrongBallsEaten = goodBallsEaten = 0;
}

function countNumberOfGoodBalls(balls, colorToEat) {
    var nb = 0;

    balls.forEach(function (b) {
        if (b.color === colorToEat)
            nb++;
    });

    return nb;
}

function changeNbBalls(nb) {
    startGame(nb);
}

function changeColorToEat(color) {
    colorToEat = color;
}

function changePlayerColor(color) {
    player.color = color;
}

function changeBallSpeed(coef) {
    globalSpeedMultiplier = coef;
}

function mouseMoved(evt) {
    mousePos = getMousePos(canvas, evt);
}

function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function movePlayerWithMouse() {
    if (mousePos !== undefined) {
        player.x = mousePos.x;
        player.y = mousePos.y;
    }
    if (timer !==0){
        player.x = mousePos.x + Math.random()*5;
        player.y = mousePos.y + Math.random()*5;
    }
}

function mainLoop() {
// 1 - clear the canvas
    ctx.clearRect(0, 0, w, h);
    if (timer !== 0) {
        invulnerable = false;
        timer--;
    }
    else {
        invulnerable = true;
    }


    //Affichage du start menu
    if (gameState === 'Launch the Game') {
        ctx.font = '50px Arial';   
        ctx.fillText ('You are about to go to war against the virus!', 10, 250);
        ctx.fillText ('Try to reach the level 16 ! ( ͡° ͜ʖ ͡°)', 105, 320);
        ctx.font = '30px Arial';
        ctx.fillText('Press <Space> to start the Game', 250, 400+Math.random()*2);
    }
        
    else if (gameState === 'PLAYING') {
        // draw the ball and the player
        drawPlayer(player);
        drawAllBalls(balls);
        drawInfosTextuelles(balls);
        // animate the ball that is bouncing all over the walls
        moveAllBalls(balls);

        movePlayerWithMouse();
    } 
    
    else if(gameState === 'Game Over') {
        ctx.font = "100px Arial";
        ctx.fillText("Virus Win !" , 205, 350+Math.random()*3);
        ctx.font = "50px Arial";
        ctx.fillText("Press <SPACE> to start again" , 120, 450);
        ctx.font = "bold 30px Arial";
        ctx.fillText("Your final score : " + score , 150, 500);
        ctx.fillText("Level : " + level , 150, 550);

    }
    else if (gameState === 'You Win') {
        ctx.font = "50px Arial";
        ctx.fillText("You win against the virus, humanity is saved!" , 8, 350+Math.random()*3);
        ctx.font = "50px Arial";
        ctx.fillText("Press <SPACE> to start again" , 120, 450);
        ctx.font = "bold 30px Arial";
        ctx.fillText("Your final score : " + score , 150, 500);
        ctx.fillText("Level : " + level , 150, 550);
    }
    // ask the browser to call mainloop in 1/60 of  for a new animation frame
    requestAnimationFrame(mainLoop);
}

// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
    var testX = cx;
    var testY = cy;
    if (testX < x0) testX = x0;
    if (testX > (x0 + w0)) testX = (x0 + w0);
    if (testY < y0) testY = y0;
    if (testY > (y0 + h0)) testY = (y0 + h0);
    return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}

function createBalls(n) {
    // empty array
    var ballArray = [];

    // create n balls
    for (var i = 0; i < n; i++) {
        var b = {
            x: w / 2,
            y: h / 2,
            radius: 5 + 40 * Math.random(), // between 5 and 40
            speedX: -5 + 10 * Math.random(), // between -5 and + 5
            speedY: -5 + 10 * Math.random(), // between -5 and + 5
            color: getARandomColor(),
        }
        // add ball b to the array

        ballArray.push(b);
    }
    // returns the array full of randomly created balls
    return ballArray;
}

function getARandomColor() {
    var colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
    // a value between 0 and color.length-1
    // Math.round = rounded value
    // Math.random() a value between 0 and 1
    var colorIndex = Math.round((colors.length - 1) * Math.random());
    var c = colors[colorIndex];

    // return the random color
    return c;
}

function drawInfosTextuelles(balls) {
    ctx.save();
    ctx.font = "20px Arial";
    if (level ===16){
        gameState = 'You Win';
    }
    else if (nbVies <= 0) {
        // on a perdu
        gameState = 'Game Over';
    } else if (goodBallsEaten === numberOfGoodBalls) {
        // On a gagné, on a mangé toutes les bonnes balles
        ctx.fillText("You Win! Final score : " + (initialNumberOfBalls - wrongBallsEaten),
            20, 30);
        // on change de niveau
        passerAuNiveauSuivant()
    } else {
        // On est en train de jouer....
        ctx.font = "20px Arial";    
        ctx.fillText("Number of viruses: " + numberOfGoodBalls, 810, 30);
        ctx.fillText("Viruses eaten: " + goodBallsEaten, 810, 50);
        ctx.fillText("Human cells eaten: " + wrongBallsEaten, 810, 70);
        ctx.fillText("Level: " + level, 810, 90);
        ctx.fillText("Vies: " + nbVies, 810, 110);
        ctx.fillText("Score: " + score, 810, 130);
    }
    ctx.restore();
}

function passerAuNiveauSuivant() {
    level++;
    globalSpeedMultiplier += 0.1;
    startGame(level);
    
}

function drawAllBalls(ballArray) {
    ballArray.forEach(function (b) {
        drawFilledCircle(b);
    });
}

function moveAllBalls(ballArray) {
    // iterate on all balls in array
    balls.forEach(function (b, index) {
        // b is the current ball in the array
        if (index === 0) {
            b.radius += 0.1;
            if (b.radius > 40) {
                b.radius = 5;
            }
            b.x += (b.speedX * globalSpeedMultiplier);
            b.y += (b.speedY * globalSpeedMultiplier);
        } else {
            b.x += (b.speedX * globalSpeedMultiplier);
            b.y += (b.speedY * globalSpeedMultiplier);
        }
            if (b.color === 'yellow'){
                b.x += Math.random()*8;
                b.radius += 0.1;
            }
        testCollisionBallWithWalls(b);
        if (invulnerable){
        testCollisionWithPlayer(b, index);
        }
    });
}
// Changement du skin du joueur

function drawPlayer(r) {
    ctx.save();
  if (player.color === 'red') {
    playerImg.src = './Bactérie/Superbactérie.png';
  }
  else if (player.color === 'green') {
    playerImg.src = './Bactérie/SuperBactérieVerte.png';
  }
  else if (player.color === 'grey') {
    playerImg.src = './Bactérie/Gentleman.png';
  }
    ctx.translate(r.x - r.width / 2, r.y - r.height / 2);

    // ctx.fillStyle = r.color;
    // ctx.fillRect(0, 0, r.width, r.height);
    ctx.drawImage(playerImg, -20, -20);
    ctx.restore();
   }



function testCollisionWithPlayer(b, index) {
    if (circRectsOverlap(player.x, player.y,
        player.width, player.height,
        b.x, b.y, b.radius)) {
        // we remove the element located at index
        // from the balls array
        // splice: first parameter = starting index
        //         second parameter = number of elements to remove
        if (b.color === colorToEat) {
            // Yes, we remove it and increment the score
            goodBallsEaten += 1;
            score += 15;
        } else {
            wrongBallsEaten += 1;
            nbVies = nbVies - 1;
        }

        balls.splice(index, 1);

    }
}

function testCollisionBallWithWalls(b) {
    // COLLISION WITH VERTICAL WALLS ?
    if ((b.x + b.radius) > w) {
        // the ball hit the right wall
        // change horizontal direction
        b.speedX = -b.speedX;

        // put the ball at the collision point
        b.x = w - b.radius;
    } else if ((b.x - b.radius) < 0) {
        // the ball hit the left wall
        // change horizontal direction
        b.speedX = -b.speedX;

        // put the ball at the collision point
        b.x = b.radius;
    }

    // COLLISIONS WTH HORIZONTAL WALLS ?
    // Not in the else as the ball can touch both
    // vertical and horizontal walls in corners
    if ((b.y + b.radius) > h) {
        // the ball hit the right wall
        // change horizontal direction
        b.speedY = -b.speedY;

        // put the ball at the collision point
        b.y = h - b.radius;
    } else if ((b.y - b.radius) < 0) {
        // the ball hit the left wall
        // change horizontal direction
        b.speedY = -b.speedY;

        // put the ball at the collision point
        b.Y = b.radius;
    }
}

function drawFilledCircle(c) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    ctx.translate(c.x, c.y);

    ctx.fillStyle = c.color;
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, c.radius, 0, 2 * Math.PI);
    ctx.fill();

    // GOOD practice: restore the context
    ctx.restore();
}