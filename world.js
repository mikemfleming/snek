class World {
  constructor() {
    this.score = 0;
    this.food = this.genFood();
  }
  genFood() {
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 19);
    const collision = snake.spine.find(v => v.x === x && v.y ===y);
    board[y][x].classList = 'food';
    this.food = { x, y };
    if (collision) {
      this.genFood()
    } else {
      return this.food;
    }
  }
  feed(food) {
    snake.grow();
    board[food.y][food.x].classList = 'snake';
    this.genFood();
    score += 10;
    scoreDiv.innerHTML = score;
  }
  paintSnake(old) {
    for (const [_, vert] of snake.spine.entries()) {
      const { x, y } = vert;
      board[y][x].classList = 'snake';
    }
    board[old.y][old.x].classList = '';
  }
  moveSnake() {
    allowMove = true;
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

const world = new World();
const interval = setInterval(world.moveSnake, 250);
