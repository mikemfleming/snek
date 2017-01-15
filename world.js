class World {
  constructor() {
    this.food = this.genFood();
  }
  genFood() {
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 19);
    const collision = snake.spine.find(v => v.x === x && v.y ===y) !== undefined;
    game.board[y][x].classList = 'food';
    this.food = { x, y };
    if (collision) {
      this.genFood();
    } else {
      return this.food;
    }
  }
  feed(food) {
    snake.grow();
    game.board[food.y][food.x].classList = 'snake';
    this.genFood();
    game.score += 10;
    game.scoreDiv.textContent = game.score;
  }
  paintSnake(old) {
    for (const [_, vert] of snake.spine.entries()) {
      const { x, y } = vert;
      game.board[y][x].classList = 'snake';
    }
    game.board[old.y][old.x].classList = '';
  }
  moveSnake() {
    game.allowMove = true;
    let { x, y } = snake.head();
    const collision = snake.spine
      .slice(0, snake.spine.length - 1)
      .find(v => v.x === x && v.y === y);
    if (collision) clearInterval(interval);
    if (x === world.food.x && y === world.food.y) world.feed({ x, y });
    if (snake.bearing === 'north') y--;
    if (snake.bearing === 'east') ++x;
    if (snake.bearing === 'south') y++;
    if (snake.bearing === 'west') x--;
    const old = snake.move(x, y);
    if (x > 19 || y > 19 || x < 0 || y < 0) {
      clearInterval(interval);
    } else {
      world.paintSnake(old);
    }
  }
}

let world = new World();
let interval = setInterval(world.moveSnake, 250);
