class State {
  constructor() {
    this.allowMove = true;
    this.score = 0;
    this.board = Array.from(document.getElementById('board').children)
      .map(c => Array.from(c.children));
    this.clearBoard();
    this.scoreDiv = document.getElementById('score');
    this.scoreDiv.textContent = 0;
    this.food = this.genFood();
    this.step = 250;
    this.bonus = 1;
    this.snakeStyle = 'snake';
    this.interval = (fn, period) => {
      setTimeout(fn.bind(this), period);
    }
    this.interval(this.moveSnake, this.step);
    this.dragon = false;
    this.fireball = null;
  }
  shootFireball() {
    this.fireball = new Fireball(snake.head(), snake.bearing);
  }
  applyFx(type) {
    console.log(type)
    const fx = {
      turbo: () => state.step = 100,
      nega: () => state.snakeStyle = 'negaStyle',
      normie: () => this.resetFx(),
      bonus: () => {
        this.bonus = 3;
        document.getElementById('score').classList = 'bonus-points';
      },
      dragon: () => this.dragon = true,
    }
    fx[type]();
  }
  resetFx() {
    state.step = 250;
    state.snakeStyle = 'snake';
    state.bonus = 1;
    document.getElementById('score').classList = '';
    this.dragon = false;
  }
  moveSnake() {
    if (this.dragon && this.fireball) {
      if (this.fireball.bearing === 'north') this.fireball.loc.y -= 3; // increment according to bearing
      if (this.fireball.bearing === 'east') this.fireball.loc.x += 3;
      if (this.fireball.bearing === 'south') this.fireball.loc.y += 3;
      if (this.fireball.bearing === 'west') this.fireball.loc.x -= 3;
      if (this.hitWall(this.fireball.loc)) this.fireball = null;
    }

    let { x, y } = snake.head();
    this.allowMove = true;

    if (x === this.food.x && y === this.food.y) { // if head is on food // this sometimes bugs out
      this.feed(this.food);                          // then eat
    }

    if (this.hitWall({ x, y }) || this.detectCollision({ x, y })) {
      console.log('dead');
    } else { // hitwall and detectCollision bug on impact
      const old = snake.move();
      this.paintSnake(old);
      this.interval(this.moveSnake, this.step);
    }
  }
  clearBoard() {
    this.board.forEach((row) => {
      row.forEach((cell) => {
        cell.classList = this.tileStyle;
      });
    });
  }
  restart() {
    snake = new Snake();
    state = new State();
  }
  genFood() {
    const foodTypes = ['nega', 'turbo', 'normie', 'bonus', 'dragon', 'quake'];
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 19);
    const type = foodTypes[Math.floor(Math.random() * 5)];
    if (this.detectCollision({ x, y })) {
      this.genFood();
    } else {
      this.board[y][x].classList = type;
      this.food = { x, y, type };
      return this.food;
    }
  }
  feed(food) {
    snake.grow();
    this.applyFx(food.type);
    this.board[food.y][food.x].classList = 'snake';
    this.genFood();
    this.updateScore();
  }
  paintSnake(old) {
    for (const [_, vert] of snake.spine.entries()) {
      const { x, y } = vert;
      this.board[y][x].classList = this.snakeStyle;
    }
    this.board[old.y][old.x].classList = '';
  }
  detectCollision(tile) {
    return snake.spine
      .slice(0, snake.spine.length - 1)
      .find(v => v.x === tile.x && v.y === tile.y)
      !== undefined;
  }
  hitWall(tile) {
    return tile.x < 0 || tile.x > 19 || tile.y < 0 || tile.y > 19;
  }
  updateScore() {
    this.score = this.score + (this.bonus * 10);
    this.scoreDiv.textContent = this.score;
  }
}
