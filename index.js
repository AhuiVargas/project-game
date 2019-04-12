const playerAImg = 'images/hex.png';
const playerBImg = 'images/green.svg';
const introMusic = 'Music/Ahuizotl - Neon (Intro).mp3';
const sceneMusic = 'Music/Ahuizotl - Neon (Game On Fix).mp3';


const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const PLAYER_SIZE = 25;
const STRIPE_PRE_COLOR = 'rgba(255, 44, 153, 0.1)';
const STRIPE_COLOR = 'rgba(255, 44, 153, 1)';
const FPS = 1000 / 60;

window.onload = () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  

  class Scene {
    constructor(sound, ctx) {
      this.audio = new Audio();
      this.audio.src = sound;
      this.audio.play();
    }
    clearScene() {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }
  
  class Stripe {
    constructor(x, y, w, h, preColor, posColor, ctx) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
  
      this.color = preColor;
      this.posColor = posColor;
  
      this.isLetal = false;
  
      this.ctx = ctx;
  
      setTimeout(() => {
        this.color = this.posColor;
        this.isLetal = true;
      }, 1000);
    }
    draw() {
      const { x, y, w, h, color, ctx } = this;
  
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }
  }
  
  class HorizontalStripe extends Stripe {
    constructor(y, h, preColor, posColor, ctx) {
      super(0, y, CANVAS_WIDTH, h, preColor, posColor, ctx);
    }
  }
  
  class VerticalStripe extends Stripe {
    constructor(x, w, preColor, posColor, ctx) {
      super(x, 0, w, CANVAS_HEIGHT, preColor, posColor, ctx);
    }
  }
  
  class Player {
    constructor(img, x, y, w, h, ctx) {
      this.img = new Image();
      this.img.src = img;
  
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
  
      this.step = 5;
  
      this.alive = true;
  
      this.ctx = ctx;
    }
    draw() {
      const { img, x, y, w, h, ctx } = this;
  
      ctx.drawImage(img, x, y, w, h);
    }
    move(axis, n) {
      const minorPosition = 0;
      const maximumPosition = axis === 'x' ? CANVAS_WIDTH - this.w : CANVAS_HEIGHT - this.h;
  
      const newPosition = this[axis] + n;
  
      this[axis] = Math.max(minorPosition, Math.min(newPosition, maximumPosition));
    }
    moveUp() {
      this.move('y', -this.step);
    }
    moveDown() {
      this.move('y', this.step);
    }
    moveLeft() {
      this.move('x', -this.step);
    }
    moveRight() {
      this.move('x', this.step);
    }
    willIDie(obstacle) {
      const { x, y } = this;
  
      return (
        x <= obstacle.x + obstacle.w &&
        x + this.w >= obstacle.x &&
        y <= obstacle.y + obstacle.h &&
        y + this.h >= obstacle.y
      );
    }
  }
  
  
  function gameStart () {
    players.push(new Player(playerAImg, 0, 0, PLAYER_SIZE, PLAYER_SIZE, ctx));
    players.push(
      new Player(
        playerBImg,
        CANVAS_WIDTH - PLAYER_SIZE,
        CANVAS_HEIGHT - PLAYER_SIZE,
        PLAYER_SIZE,
        PLAYER_SIZE,
        ctx
      )
    );
    
    interval = setInterval(() => {
      scene.clearScene();
    
      generateStripes();
      const activeStripes = stripes.slice(-4);
    
      playerMovements();
      render([players, activeStripes]);
    
      checkCollisions(players, activeStripes);
    
      frames++;
    }, FPS);
  
  }
  const stripes = [];
  const players = [];
  const scene = new Scene(sceneMusic, ctx);
  let frames = 0, interval;
  
  
  function render(array) {
    const toRender = [].concat(...array);
    toRender.forEach(object => object.draw());
  }
  
  function playerMovements() {
    const [player1, player2] = players;
  
    
    if (player1.alive) {
      if (Keys.isDown(Keys.W)) player1.moveUp();
      if (Keys.isDown(Keys.S)) player1.moveDown();
      if (Keys.isDown(Keys.A)) player1.moveLeft();
      if (Keys.isDown(Keys.D)) player1.moveRight();
    }
  
    if (player2.alive) {
      if (Keys.isDown(Keys.UP)) player2.moveUp();
      if (Keys.isDown(Keys.DOWN)) player2.moveDown();
      if (Keys.isDown(Keys.LEFT)) player2.moveLeft();
      if (Keys.isDown(Keys.RIGHT)) player2.moveRight();
    }
  }
  
  function generateStripes() {
    if (frames > 0 && frames % 60 === 0) {
      const w = Math.random() * 50;
      const x = Math.random() * CANVAS_WIDTH - w;
  
      stripes.push(new VerticalStripe(x, w, STRIPE_PRE_COLOR, STRIPE_COLOR, ctx));
    } else if (frames > 0 && frames % 30 === 0) {
      const h = Math.random() * 50;
      const y = Math.random() * CANVAS_HEIGHT - h;
  
      stripes.push(new HorizontalStripe(y, h, STRIPE_PRE_COLOR, STRIPE_COLOR, ctx));
    }
  }
  
  function checkCollisions(players, stripes) {
    stripes.forEach(stripe => {
      players.forEach((player, n) => {
        if (player.willIDie(stripe) && stripe.isLetal) {
          player.alive = false;
          gameOver(n);
        }
      });
    });
  }
  
  function gameOver(n) {
    clearInterval(interval);
    const winner = n === 0 ? 1 : 0;
    ctx.fillText(`Player ${winner} won!`, 300, 300);
    
  }
  
  const Keys = {
    _pressed: {},
    W: 87,
    S: 83,
    A: 65,
    D: 68,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    isDown(keyCode) {
      return this._pressed[keyCode];
    },
    onKeydown(event) {
      this._pressed[event.keyCode] = true;
    },
    onKeyup(event) {
      delete this._pressed[event.keyCode];
    }
  };
  
  document.addEventListener('keydown', event => {
  if (event.keyCode === 13) gameStart()
    Keys.onKeydown(event);
  });
  document.addEventListener('keyup', event => {
    Keys.onKeyup(event);
  });
}
