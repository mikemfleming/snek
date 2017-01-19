class State {
  constructor() {
    this.allowMove = true;
    this.score = 0;
    this.board = Array.from(document.getElementById('board').children)
      .map(c => Array.from(c.children));
    this.scoreDiv = document.getElementById('score');
    this.scoreDiv.textContent = 0; // reset score
    this.food = food.genFood(); // make new food
    this.time = 250; // can be changed by turbo food
    this.bonus = 1; // also ^
    this.snakeStyle = 'snake'; // can be changed be nega food
    this.interval = (fn, period) => { 
      return setTimeout(fn.bind(this), period);
    }; // interval can be used by any function or times

    this.clearBoard(); // clears last game
    this.interval(this.step, this.time); // starts steppin
  }
  applyFx(type) {
    const fx = {
      turbo: () => this.time = 100,
      nega: () => this.snakeStyle = 'negaStyle',
      normie: () => this.resetFx(),
      bonus: () => {
        this.bonus = 3;
        document.getElementById('score').classList = 'bonus-points';
      },
    };
    fx[type]();
  }
  resetFx() {
    this.time = 250;
    this.snakeStyle = 'snake';
    this.bonus = 1;
    document.getElementById('score').classList = '';
  }
  paint() {
    // paint snake
    const oldSnake = snake.trail; // to erase
    for (const [_, vert] of snake.spine.entries()) {
      const { x, y } = vert;
      this.board[y][x].classList = this.snakeStyle;
    }
    this.board[oldSnake.y][oldSnake.x].classList = '';
    // paint food
    this.board[this.food.y][this.food.x].classList = this.food.type;
  }
  step() {
    snake.move();
    let { x, y } = snake.head();
    if (x === this.food.x && y === this.food.y) { // check if need to eat
      this.feed();
    }
    if (this.hitWall({ x, y }) || this.detectCollision({ x, y })) {
      console.log('dead')
      return; // end if snake hit wall or bit itself
    }
    this.paint(); // paint all the movement we just did
    this.interval(this.step, this.time); // set another interval
    this.allowMove = true; // resets for user input
  }
  clearBoard() {
    this.board.forEach((row) => {
      row.forEach((cell) => {
        cell.classList = '';
      });
    });
  }
  restart() { // needs to check a "game on" property
    snake = new Snake();
    food = new Food();
    state = new this();
    this.resetFx();
  }
  feed() {
    let newFood = food.genFood(); // gen new food
    while (this.detectCollision(newFood)) {
      newFood = food.genFood(); // call until no collision
    }
    this.applyFx(this.food.type); // activate fx
    this.food = newFood; // commit it to this
    snake.grow(); // add length to snake
    this.updateScore();
  }
  detectCollision(tile) {
    return snake.spine  // is the tile on the snake
      .slice(0, snake.spine.length - 2) // anywhere below it's head
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
