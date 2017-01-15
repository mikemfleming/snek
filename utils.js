const board = Array.from(document.getElementById('board').children)
  .map(c => Array.from(c.children));
const scoreDiv = document.getElementById('score');
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', e => restart());
let allowMove = true;
let score = 0;
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
const momentum = {
  ArrowUp: 'south',
  ArrowRight: 'west',
  ArrowDown: 'north',
  ArrowLeft: 'east',
  w: 'south',
  d: 'west',
  s: 'north',
  a: 'east',
};

document.onkeydown = (e) => {
  const turn = e.key;
  if (directions[turn]) {
    e.preventDefault();
    if (snake.bearing !== momentum[turn] && allowMove) {
      snake.bearing = directions[e.key];
      allowMove = false;
    }
  }
};

function clearBoard() {
  board.forEach(row => {
    row.forEach(cell => {
      cell.classList = '';
    });
  });
}

function restart() {
  clearBoard();
  snake = new Snake();
  world = new World();
  interval = setInterval(world.moveSnake, 250);
}
