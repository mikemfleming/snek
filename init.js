let snake = new Snake();
let food = new Food();
let state = new State();

document.getElementById('restart')
  .addEventListener('click', e => state.restart());

document.onkeydown = (e) => {
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
  if (directions[e.key] || e.key === ' ') e.preventDefault();
  if (directions[e.key]) {
    if (snake.bearing !== momentum[e.key] && state.allowMove) {
      snake.bearing = directions[e.key];
      state.allowMove = false;
    }
  }
};

if (username) {
  setTimeout(() => {
      document.getElementById('leaderboard').style.transform = 'translateX(0)';
  }, 100);
  document.getElementById('user').textContent = username;
  document.getElementById('auth').innerHTML = '<a href="/logout" class="btn btn-default"><span class="fa fa-user"></span>Logout</a>';
}
setTimeout(() => document.getElementById('social').style.top = '0.5em', 2000);

