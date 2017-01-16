let control = new Control();
let snake = new Snake();
let state = new State();

document.getElementById('restart')
  .addEventListener('click', e => control.restart());

document.onkeydown = (e) => {
  const turn = e.key;
  if (control.directions[turn]) {
    e.preventDefault();
    if (snake.bearing !== control.momentum[turn] && state.allowMove) {
      snake.bearing = control.directions[e.key];
      state.allowMove = false; // IOC !!!
    }
  }
};
