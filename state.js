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
    this.snakeStyle = 'snake';
    this.interval = (period) => {
      setTimeout(this.moveSnake.bind(this), period);
    }
  }
  applyFx(type) {
    console.log(type)
    const fx = {
      turbo: () => {
        state.step = 100;
      },
      nega: () => {
        state.snakeStyle = 'negaStyle';
      },
      normie: () => {
        this.resetFx();
      }
    }
    fx[type]();
  }
  resetFx() {
    state.step = 250;
    state.snakeStyle = 'snake';
  }
  moveSnake() {
    let { x, y } = snake.head();

    this.allowMove = true;

    if (state.detectCollision({ x, y })) { // snake bit itself
      clearInterval(this.interval);
      console.log('dead');
    }

    if (x === this.food.x && y === this.food.y) { // if head is on food
      this.feed(this.food);                          // then eat
    }

    if (snake.bearing === 'north') y--; // increment according to bearing
    if (snake.bearing === 'east') ++x;
    if (snake.bearing === 'south') y++;
    if (snake.bearing === 'west') x--;

    const old = snake.move(x, y); // takes vert to be removed
    
    if (this.hitWall({ x, y })) {
      clearInterval(this.interval);
      console.log('dead');
    } else {
      this.paintSnake(old);
      this.interval(this.step);
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
    clearInterval(this.interval);
    snake = new Snake();
    state = new State();
  }
  genFood() {
    const foodTypes = ['nega', 'turbo', 'normie', 'bonus', 'quake'];
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 19);
    const type = foodTypes[Math.floor(Math.random() * 3)];
    if (this.detectCollision({ x, y })) {
      this.genFood();
    } else {
      this.board[y][x].classList = type;
      this.food = { x, y, type };
      console.log(this.food)
      return this.food;
    }
  }
  feed(food) {
    snake.grow();
    console.log(food)
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
    this.board[old.y][old.x].classList = 'tile';
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
    this.score += 10;
    this.scoreDiv.textContent = this.score;
  }
}
