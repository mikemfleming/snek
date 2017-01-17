let snake = new Snake();
let state = new State();
state.interval(250);

document.getElementById('restart')
  .addEventListener('click', e => state.restart());

document.onkeydown = (e) => {
  const turn = e.key;
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
  if (directions[turn]) {
    e.preventDefault();
    if (snake.bearing !== momentum[turn] && state.allowMove) {
      snake.bearing = directions[e.key];
      state.allowMove = false; // IOC !!!
    }
  }
};
