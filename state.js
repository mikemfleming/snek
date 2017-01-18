class State {
  constructor() {
    this.allowMove = true;
    this.score = 0;
    this.board = Array.from(document.getElementById('board').children)
      .map(c => Array.from(c.children));
    this.clearBoard();
    this.scoreDiv = document.getElementById('score');
    this.scoreDiv.textContent = 0;
    this.food = this.genFood();
    this.time = 250;
    this.bonus = 1;
    this.snakeStyle = 'snake';
    this.interval = (fn, period) => {
      console.log('rollin')
      setTimeout(fn.bind(this), period);
    }
    this.interval(this.step, this.time);
    this.dragon = false;
  }
  applyFx(type) {
    const fx = {
      turbo: () => state.time = 100,
      nega: () => state.snakeStyle = 'negaStyle',
      normie: () => this.resetFx(),
      bonus: () => {
        this.bonus = 3;
        document.getElementById('score').classList = 'bonus-points';
      },
      dragon: () => this.dragon = true,
    }
    fx[type]();
  }
  resetFx() {
    state.time = 250;
    state.snakeStyle = 'snake';
    state.bonus = 1;
    document.getElementById('score').classList = '';
    this.dragon = false;
  }
  // moveFireball() {    
  //   // const oldFireball = fireball.move();
  //   const currentFireball = fireball.currentLocation();
  //   // this.board[oldFireball.y][oldFireball.x].classList = ''; // removes oldFireball style
  //   if (this.hitWall(currentFireball)) { // deactivate when it hits a wall
  //     fireball = false;
  //   } else {
  //     // this.board[currentFireball.y][currentFireball.x].classList = 'fireball';      
  //   }
  // }
  paint() {
    // paint snake
    const oldSnake = snake.trail; // to erase
    for (const [_, vert] of snake.spine.entries()) {
      const { x, y } = vert;
      this.board[y][x].classList = this.snakeStyle;
    }
    this.board[oldSnake.y][oldSnake.x].classList = '';
    // paint fireball
    if (this.dragon && fireball) { // if dragon mode and active fireball
      const oldBall = fireball.trail // to erase
      const currBall = fireball.currentLocation();
      this.board[oldBall.y][oldBall.x].classList = ''; // removes oldFireball style
      if (this.hitWall(currBall)) {
        fireball = undefined;
        return
      }
      this.board[currBall.y][currBall.x].classList = 'fireball';
    }
    // paint food
    this.board[this.food.y][this.food.x].classList = this.food.type;
  }
  step() {
    // dragon mode stuff
    if (this.dragon && fireball) { 
      // this.moveFireball();
      fireball.move();
    }
    snake.move()
    // if fireball, move fireball
    // move snake
    // paint snake
    // paint fireball
    // paint food


    // snake movement
    let { x, y } = snake.head();
    this.allowMove = true;
    if (x === this.food.x && y === this.food.y) { // if head is on food // this sometimes bugs out
      this.feed(this.food);                          // then eat
    }
    if (this.hitWall({ x, y }) || this.detectCollision({ x, y })) {
      console.log('dead');
    }
    // } else { // hitwall and detectCollision bug on impact
    //   const old = snake.move();
    //   this.paintSnake(old);
    //   // this.interval(this.step, this.time);
    // }
    this.paint();
    this.interval(this.step, this.time);
  }
  clearBoard() {
    this.board.forEach((row) => {
      row.forEach((cell) => {
        cell.classList = this.tileStyle;
      });
    });
  }
  restart() {
    snake = new Snake();
    state = new State();
  }
  genFood() {
    const foodTypes = ['nega', 'turbo', 'normie', 'bonus', 'dragon', 'quake'];
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 19);
    // const type = foodTypes[Math.floor(Math.random() * 5)];
    const type = foodTypes[4];
    if (this.detectCollision({ x, y })) {
      this.genFood();
    } else {
      // this.board[y][x].classList = type;
      this.food = { x, y, type };
      return this.food;
    }
  }
  feed(food) {
    snake.grow();
    this.applyFx(food.type);
    this.board[food.y][food.x].classList = 'snake';
    this.genFood();
    this.updateScore();
  }
  paintSnake(old) {
    for (const [_, vert] of snake.spine.entries()) {
      const { x, y } = vert;
      this.board[y][x].classList = this.snakeStyle;
    }
    this.board[old.y][old.x].classList = '';
  }
  detectCollision(tile) {
    return snake.spine
      .slice(0, snake.spine.length - 1)
      .find(v => v.x === tile.x && v.y === tile.y)
      !== undefined;
  }
  hitWall(tile) {
    return tile.x < 0 || tile.x > 19 || tile.y < 0 || tile.y > 19;
  }
  updateScore() {
    this.score = this.score + (this.bonus * 10);
    this.scoreDiv.textContent = this.score;
  }
}
