let snake = new Snake();
let fireball;
let food = new Food();
let state = new State();

document.getElementById('restart')
  .addEventListener('click', e => state.restart());

document.onkeydown = (e) => {
  const directions = { 
    ArrowUp: 'north', ArrowRight: 'east',
    ArrowDown: 'south', ArrowLeft: 'west',
    w: 'north', d: 'east',
    s: 'south', a: 'west',
  };
  const momentum = {
    ArrowUp: 'south', ArrowRight: 'west',
    ArrowDown: 'north', ArrowLeft: 'east',
    w: 'south', d: 'west',
    s: 'north', a: 'east',
  };
  if (directions[e.key]) {
    e.preventDefault();
    if (snake.bearing !== momentum[e.key] && state.allowMove) {
      snake.bearing = directions[e.key];
      state.allowMove = false; // IOC !!!
    }
  }
  if (e.key === ' ' && state.dragon && !fireball) { // if spacebar, dragon mode, and no fireball
    e.preventDefault();
    fireball = new Fireball(snake.head(), snake.bearing);
  }
};
