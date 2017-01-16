class Control {
  constructor() {
    this.restartButton = document.getElementById('restart');
    this.directions = {
      ArrowUp: 'north',
      ArrowRight: 'east',
      ArrowDown: 'south',
      ArrowLeft: 'west',
      w: 'north',
      d: 'east',
      s: 'south',
      a: 'west',
    };
    this.momentum = {
      ArrowUp: 'south',
      ArrowRight: 'west',
      ArrowDown: 'north',
      ArrowLeft: 'east',
      w: 'south',
      d: 'west',
      s: 'north',
      a: 'east',
    };
    this.restartButton.addEventListener('click', e => this.restart());
    document.onkeydown = (e) => {
      const turn = e.key;
      if (this.directions[turn]) {
        e.preventDefault();
        if (snake.bearing !== this.momentum[turn] && state.allowMove) {
          snake.bearing = this.directions[e.key];
          state.allowMove = false; // IOC !!!
        }
      }
    };
  }
  moveSnake() {
    state.allowMove = true; // IOC !!
    let { x, y } = snake.head();
    const collision = snake.spine // collision bug ??
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
      console.log('dead')
      clearInterval(state.interval); // IOC !!
    } else {
      state.paintSnake(old);
    }
  }
  clearBoard() {
    state.board.forEach(row => {
      row.forEach(cell => {
        cell.classList = '';
      });
    });
  }
  restart() {
    this.clearBoard();
    snake = new Snake();
    state = new State();
    state.scoreDiv.textContent = 0;
  }
}

let control = new Control();
