let hexagon = "https://ya-webdesign.com/images/hylian-shield-png-5.png";

let obstacles = [];

window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

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
      ctx.drawImage(this.img, this.x, this.y, 30, 30);
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
    // isTouching(obstacle){
    //   return  (this.x < obstacle.x + obstacle.width) &&
    //           (this.x + 15  > obstacle.x) &&
    //           (this.y < obstacle.y + obstacle.height) &&
    //           (this.y + 15 > obstacle.y)
    //}
    //}
  }

  const player = new Player(hexagon, 0, 105);
  let frames = 0;
  let interval;

  let obstaclesArray = [];

  class Stripe {
    constructor(y = 0, height = 270, type) {
      this.x = canvas.width;
      this.y = y;
      this.width = Math.floor(Math.random() * 50);
      this.height = height;
      0;
      this.type = type;
    }
    draw() {
      if (this.type) {
        ctx.drawImage(this.img1, this.x, this.y, this.width, this.height);
      } else {
        ctx.drawImage(this.img2, this.x, this.y, this.width, this.height);
      }
      // this.x--;
    }
  }

  function generateStripe(array) {
    array.slice(0, 3).forEach(obstacle => {
      obstacle.draw();
    });

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //board.draw()
      player.draw();
      if (frames % 60 === 0);
      obstaclesArray.unshift(new Obstacle(300));
    }
    drawObstacles(obstaclesArray);
    frames++;

    obstaclesArray.push();
  }

  function startGame() {
    if (interval) return;
    interval = setInterval(update, 1000 / 60);
  }

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
