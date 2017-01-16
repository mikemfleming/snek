class Control {
  constructor() {
    this.restartButton = document.getElementById('restart');
    this.directions = { 
      ArrowUp: 'north', ArrowRight: 'east',
      ArrowDown: 'south', ArrowLeft: 'west',
      w: 'north', d: 'east',
      s: 'south', a: 'west',
    };
    this.momentum = {
      ArrowUp: 'south', ArrowRight: 'west',
      ArrowDown: 'north', ArrowLeft: 'east',
      w: 'south', d: 'west',
      s: 'north', a: 'east',
    };
  }
  moveSnake() { // needs to be functional-ized
    state.allowMove = true; // could use get/set for better IOC
    let { x, y } = snake.head();
    const collision = snake.spine // collision detection could be its own function
      .slice(0, snake.spine.length - 1)
      .find(v => v.x === x && v.y === y);
    if (collision) clearInterval(interval); // needs to talk to state
    if (x === state.food.x && y === state.food.y) state.feed({ x, y });
    if (snake.bearing === 'north') y--;
    if (snake.bearing === 'east') ++x;
    if (snake.bearing === 'south') y++;
    if (snake.bearing === 'west') x--;
    const old = snake.move(x, y);
    if (x > 19 || y > 19 || x < 0 || y < 0) {
      clearInterval(state.interval); // could use get/set for better IOC
    } else {
      state.paintSnake(old);
    }
  }
  clearBoard() {
    state.board.forEach((row) => {
      row.forEach((cell) => {
        cell.classList = '';
      });
    });
  }
  restart() { // make an init file ??
    this.clearBoard();
    clearInterval(state.interval);
    snake = new Snake();
    state = new State();
    state.scoreDiv.textContent = 0;
  }
}
