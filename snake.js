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
const snake = {
  bearing: 'east',
  x: 9,
  y: 9,
  history: [],
};

document.onkeydown = (e) => {
  snake.bearing = directions[e.key];
};

function moveSnake() {
  if (snake.bearing === 'north') snake.y -= 1;
  if (snake.bearing === 'east') snake.x += 1;
  if (snake.bearing === 'south') snake.y += 1;
  if (snake.bearing === 'west') snake.x -= 1;
  if (snake.x < 20 && snake.y < 20) {
    board[snake.y][snake.x].classList = 'snake';
  } else {
    console.log('dead');
  }
}

setInterval(moveSnake, 1000);
