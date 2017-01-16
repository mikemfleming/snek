class State {
  constructor() {
    this.allowMove = true;
    this.score = 0;
    this.board = Array.from(document.getElementById('board').children)
      .map(c => Array.from(c.children));
    this.scoreDiv = document.getElementById('score');
    this.food = this.genFood();
    this.interval = setInterval(control.moveSnake, 250);
  }
  genFood() {
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 19);
    if (this.detectCollision({ x, y })) {
      this.genFood();
    } else {
      this.board[y][x].classList = 'food';
      this.food = { x, y };
      return this.food;
    }
  }
  feed(food) {
    snake.grow();
    this.board[food.y][food.x].classList = 'snake';
    this.genFood();
    this.score += 10; // score keeping could be its own function
    this.scoreDiv.textContent = this.score;
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
}
