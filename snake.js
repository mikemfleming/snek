const board = Array.from(document.getElementById('board').children)
  .map(c => Array.from(c.children));
const directions = {
  ArrowUp: 'north',
  ArrowRight: 'east',
  ArrowDown: 'south',
  ArrowLeft: 'west',
  w: 'north',
  d: 'east',
  s: 'south',
  a: 'west',
};
class Snake {
  constructor() {
    this.bearing = 'east';
    this.spine = [{ x: 7, y: 9 },
                  { x: 8, y: 9 },
                  { x: 9, y: 9 }];
  }
  head() {
    return this.spine[this.spine.length - 1];
  }
  move(x, y) {
    return this.spine.push({ x, y }) && this.spine.shift();
  }
}
const snake = new Snake();
const interval = setInterval(moveSnake, 750);

document.onkeydown = (e) => {
  snake.bearing = directions[e.key];
};

function paintSnake(old) {
  for (const [idx, vert] of snake.spine.entries()) {
    const { x, y } = vert;
    board[y][x].classList = 'snake';
  }
  board[old.y][old.x].classList = '';
}

function moveSnake() {
  let { x, y } = snake.head();
  console.log(x, y);
  if (snake.bearing === 'north') y--;
  if (snake.bearing === 'east') ++x;
  if (snake.bearing === 'south') y++;
  if (snake.bearing === 'west') x--;
  const old = snake.move(x, y);

  if (x > 19 || y > 19 || x < 0 || y < 0) {
    clearInterval(interval);
  } else {
    paintSnake(old);
  }
}
