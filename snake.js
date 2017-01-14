const board = document.getElementById('board').children;
const directions = {
  ArrowUp: 'north',
  ArrowRight: 'east',
  ArrowDown: 'south',
  ArrowLeft: 'west',
  w: 'north',
  d: 'east',
  s: 'south',
  a: 'west',
}
document.onkeydown = (e) => { console.log(directions[e.key]) }

function moveSnake() {
  for (const i of board) {
    console.log(i);
  }
}

// setInterval(moveSnake, 1000);
