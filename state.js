class State {
  constructor() {
    this.allowMove = true;
    this.score = 0;
    this.board = Array.from(document.getElementById('board').children)
      .map(c => Array.from(c.children));
    this.scoreDiv = document.getElementById('score');
    this.scoreDiv.textContent = 0;
    this.food = this.genFood();
    this.interval = setInterval(this.moveSnake.bind(this), 250);
  }
  toggleAllowMove() {
    this.allowMove = ! this.allowMove
  }
  moveSnake() {
    let { x, y } = snake.head();

    this.allowMove = true;

    if (state.detectCollision({ x, y })) { // snake bit itself
      clearInterval(this.interval);
      console.log('dead');
    }

    if (x === this.food.x && y === this.food.y) { // if head is on food
      this.feed({ x, y });                          // then eat
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
    }
  }
  clearBoard() {
    this.board.forEach((row) => {
      row.forEach((cell) => {
        cell.classList = '';
      });
    });
  }
  restart() {
    this.clearBoard();
    clearInterval(this.interval);
    snake = new Snake();
    state = new State();
  }
  genFood() {
    const foodTypes = ['nega', 'quake', 'turbo', 'normie', 'bonus'];
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 19);
    const type = foodTypes[Math.floor(Math.random() * foodTypes.length)];
    if (this.detectCollision({ x, y })) {
      this.genFood();
    } else {
      this.board[y][x].classList = type;
      this.food = { x, y };
      return this.food;
    }
  }
  feed(food) {
    snake.grow();
    this.board[food.y][food.x].classList = 'snake';
    this.genFood();
    this.updateScore();
  }
  paintSnake(old) {
    for (const [_, vert] of snake.spine.entries()) {
      const { x, y } = vert;
      this.board[y][x].classList = 'snake';
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
    this.score += 10;
    this.scoreDiv.textContent = this.score;
  }
}
