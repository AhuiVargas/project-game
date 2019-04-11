const hexagon = "images/hex.png";
const green = "images/green.svg";
const stripeimg = "images/stripe.png";

let frames = 0;
let interval;
const obstacles = [];
let intro = new Audio();
intro.src = "Music/Ahuizotl - Neon (Intro).mp3";
intro.loop = true;
intro.currentTime = 0;
let startMusic = new Audio();
startMusic.src = "Music/Ahuizotl - Neon (Game On Fix).mp3";
startMusic.loop = true;
startMusic.currentTime = 0;

window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  intro.play();

  //CLASES

  //class Board {
  //  constructor() {
  //    this.x = 0;
  //    this.y = 0;
  //    this.width = canvas.width;
  //    this.height = canvas.height;
  //  }
  //}

  class Player {
    constructor(img, x, y) {
      this.x = x;
      this.y = y;
      this.touch = false;
      this.img = new Image();
      this.img.src = hexagon;
      this.img.onload = () => {
        this.draw();
      };
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, 25, 25);
    }

    moveUp() {
      if(this.touch) return
      this.y -= 25;
    }
    moveDown() {
      if(this.touch) return
      this.y += 25;
    }
    moveRight() {
      if(this.touch) return
      this.x += 25;
    }
    moveLeft() {
      if(this.touch) return
      this.x -= 25;
    }
    isTouching(obstacle) {
      if (obstacle.type === true)
      return (
        this.x <= obstacle.x + obstacle.width &&
        this.x + 25 >= obstacle.x + 50 &&
        this.y <= obstacle.y + obstacle.height &&
        this.y + 25 >= obstacle.y
        );
    }
  }

  class Player2 {
    constructor(img, x, y) {
      this.x = x;
      this.y = y;
      this.touch = false;
      this.img = new Image();
      this.img.src = green;
      this.img.onload = () => {
        this.draw();
      };
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, 25, 25);
    }

    moveUp() {
      if(this.touch) return
      this.y -= 25;
    }
    moveDown() {
      if(this.touch) return
      this.y += 25;
    }
    moveRight() {
      if(this.touch) return
      this.x += 25;
    }
    moveLeft() {
      if(this.touch) return
      this.x -= 25;
    }
    isTouching(obstacle) {
      if (obstacle.type === true)
      return (
        this.x <= obstacle.x + obstacle.width &&
        this.x + 25 >= obstacle.x + 50 &&
        this.y <= obstacle.y + obstacle.height &&
        this.y + 25 >= obstacle.y
        );
       
    } 
  }

  class Stripe {
    // X
    constructor(y = 0, height = canvas.height, width = canvas.width, type) {
      this.x = Math.floor(Math.random() * 700);
      this.y = 0;
      this.width = Math.floor(Math.random() * 50);
      this.height = height;
      this.type = type;
    }
    draw() {
      ctx.fillRect(this.x, this.y, this.height, canvas.width);
    }
    color(color) {
      ctx.fillStyle = color;
    }
  }

  class StripeY {
    // y
    constructor(y = 0, height = canvas.height, width = canvas.width, type) {
      this.x = 0;
      this.y = Math.floor(Math.random() * 500);
      this.width = width;
      this.height = Math.floor(Math.random() * 50);
      this.type = type;
    }
    draw() {
      ctx.fillRect(this.x, this.y, canvas.width, this.height);
    }
    color(color) {
      ctx.fillStyle = color;
    }
  }

  //DEFINICIONES
  const player = new Player(hexagon, 430, 230);
  const player2 = new Player2(green, 230, 230);

  //FLUJO PRINCIPAL
  function update() {
    let activeObstacles = obstacles.slice(-5);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //board.draw()
    player.draw();
    player2.draw();
    activeObstacles.forEach(obstacle => {
     // obstacle.draw("rgba(255, 44, 153, 0.4)");
      obstacle.draw();
      obstacle.color("rgba(255, 44, 153)");
    });
    // isSolid();
    checkCollition(activeObstacles);
    generateStripe();
    frames++;
  }

  function startGame() {
    if (interval) return;
    interval = setInterval(update, 1000 / 60);
    intro.pause();
    startMusic.play();
  }

  //HELPERS

  function generateStripe() {
    const randomHeight = Math.floor(Math.random() * 50);
    const randomWidth = Math.floor(Math.random() * 50);
    if (frames > 87 && frames % 90 === 0) {
      const obs1 = new Stripe(0, randomWidth, canvas.height, true);
      obstacles.push(obs1);
    }
    if (frames > 87 && frames % 30 === 0) {
      const obs2 = new StripeY(0, randomHeight, canvas.width, true);
      obstacles.push(obs2);
    }
  }
  //function isSolid() {
  //  setTimeout(() => {
  //    obstacles.forEach((obs1) => {
  //      console.log(obs1)
  //      if (obs1.type === false) obs1.type = true;
  //     obs1.color("peru")
  //      // if (obs1.type === false) obs1.type = true;
  //    //obs1.style.color("rgba(255, 44, 153)");
  //    });
  //  }, 300);
  //}

  function gameOver() {
    clearInterval(interval);
    ctx.fillText("Game over", canvas.width / 2 - 20, canvas.height / 2);
    startMusic.pause();
  }

  function player1Out() {
   // player.clearRect();
   let out1 = true;
   ctx.fillText(
      "Player One is out!",
      canvas.width / 2 - 20,
      canvas.height / 2
    );
  }
  let out1 = false;
  let out2 = false;

  function player2Out() {
   // clearInterval(player2);
    ctx.fillText(
      "Player Two is out!",
      canvas.width / 2 - 20,
      canvas.height / 2
    );
    //setTimeout (() => {
    //  clearText
    //},1000)
  }

  function checkCollition(activeObstacles) {
    activeObstacles.forEach(obstacle => {
      if (player.isTouching(obstacle)) {
        player.touch = true;
        player1Out();
      }
      if (player2.isTouching(obstacle)) player2.touch = true, player2Out();
      if (player.touch === true && player2.touch === true) gameOver();
    });
  }


  //function checkCollition(activeObstacles) {
  //  activeObstacles.forEach(obstacle => {
  //    if (player.isTouching(obstacle)) player1Out();
  //    if (player2.isTouching(obstacle)) player2Out();
  //    if (out1 === true && out2 === true) gameOver();
  //  });
  //}

  
//LISTENERS

  document.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 13:
        startGame();
        break;
      case 38:
        if (player.y > 0) player.moveUp();
        break;
      case 40:
        if (player.y <= canvas.height) player.moveDown();
        break;
      case 37:
        if (player.x > 0) player.moveLeft();
        break;
      case 39:
        if (player.x <= canvas.width) player.moveRight();
        break;
    }
  });

 
  document.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 87:
        if (player2.y > 0) player2.moveUp();
        break;
      case 83:
        if (player2.y <= canvas.height) player2.moveDown();
        break;
      case 65:
        if (player2.x > 0) player2.moveLeft();
        break;
      case 68:
        if (player2.x <= canvas.width) player2.moveRight();
        break;
    }
  });
};
