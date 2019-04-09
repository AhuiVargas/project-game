const hexagon = "https://ya-webdesign.com/images/hylian-shield-png-5.png";
const stripeimg = "images/stripe.png";

let frames = 0;
let interval;
const obstacles = [];
//let obstaclesArray = [];

window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  //CLASES

  class Player {
    constructor(img, x, y) {
      this.x = x;
      this.y = y;
      this.img = new Image();
      this.img.src = hexagon;
      this.img.onload = () => {
        this.draw();
      };
    }
    draw() {
      ctx.drawImage(this.img, this.x, this.y, 50, 50);
    }

    moveUp() {
      this.y -= 25;
    }
    moveDown() {
      this.y += 25;
    }
    moveRight() {
      this.x += 25;
    }
    moveLeft() {
      this.x -= 25;
    }
    isTouching(obstacle) {
      return (
        this.x < obstacle.x + obstacle.width &&
        this.x + 50 > obstacle.x &&
        this.y < obstacle.y + obstacle.height &&
        this.y + 50 > obstacle.y
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
      this.img1 = new Image();
      this.img1.src = stripeimg;
      //this.generateStripe()
      //this..onload = () => {
      //  this.draw();
      //};
    }
    draw() {
      if (this.type) {
        ctx.drawImage(this.img1, this.x, this.y, this.width, this.height);
      } else {
        //console.log(
        //  this.x,
        //  this.y,
        //  this.width,
        //  this.height,
        //  this.type,
        //  this.img1.src
        //);

        ctx.drawImage(this.img1, this.x, this.y, this.width, canvas.height);
      }
      // this.x--;
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
      this.img1 = new Image();
      this.img1.src = stripeimg;
      //this.generateStripe()
      //this..onload = () => {
      //  this.draw();
      //};
    }
    draw() {
      if (this.type) {
        ctx.drawImage(this.img1, this.x, this.y, this.width, this.height);
      } else {
        //console.log(
        //  this.x,
        //  this.y,
        //  this.width,
        //  this.height,
        //  this.type,
        //  this.img1.src
        //);

        ctx.drawImage(this.img1, this.x, this.y, canvas.width, this.height);
      }
      // this.x--;
    }
  }

  //DEFINICIONES
  const player = new Player(hexagon, 0, 105);

  //FLUJO PRINCIPAL
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //board.draw()
    player.draw();
    generateStripe();
    obstacles.slice(-4).forEach(obstacle => {
      obstacle.draw();
    });
    checkCollition();
    //drawObstacles()

    //if (frames % 60 === 0);
    //obstaclesArray.unshift(new Obstacle(300));
    frames++;
  }

  function startGame() {
    if (interval) return;
    interval = setInterval(update, 1000 / 60);
  }

  //HELPERS

  function generateStripe() {
    const randomHeight = Math.floor(Math.random() * 50);
    const randomWidth = Math.floor(Math.random() * 50);
    if (frames > 0 && frames % 60 === 0) {
      const obs1 = new Stripe(randomHeight, 400, false);
      obstacles.push(obs1);
    }
    if (frames > 0 && frames % 90 === 0) {
      const obs2 = new StripeY(400, randomWidth, true);
      obstacles.push(obs2);
    }
  }

  function gameOver() {
    clearInterval(interval);
    ctx.fillText("Game over", canvas.width / 2 - 20, canvas.height / 2);
    // buttonStart.style.display = "block";
  }

  function checkCollition() {
    obstacles.forEach(obstacle => {
      if (player.isTouching(obstacle)) gameOver();
    });
  }

  // drawObstacles(obstaclesArray);
  // obstaclesArray.push();

  document.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 13:
        startGame();
        break;
      case 38:
        player.moveUp();
        break;
      case 40:
        player.moveDown();
        break;
      case 37:
        player.moveLeft();
        break;
      case 39:
        player.moveRight();
        break;
    }
  });
};
