class Game {
  constructor() {
    this.score = 0;
    this.board = Array.from(document.getElementById('board').children)
      .map(c => Array.from(c.children));
    this.scoreDiv = document.getElementById('score');
    this.restartButton = document.getElementById('restart');
    this.allowMove = true;
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
        if (snake.bearing !== this.momentum[turn] && this.allowMove) {
          snake.bearing = this.directions[e.key];
          this.allowMove = false;
        }
      }
    };
  }
  clearBoard() {
    board.forEach(row => {
      row.forEach(cell => {
        cell.classList = '';
      });
    });
  }
  restart() {
    clearBoard();
    snake = new Snake();
    world = new World();
    interval = setInterval(world.moveSnake, 250);
  }
}

let game = new Game();
