class Snake {
  constructor() {
    this.bearing = 'east';
    this.spine = [{ x: 7, y: 9 },
                  { x: 8, y: 9 },
                  { x: 9, y: 9 }];
    this.trail = { x: 6, y: 9 };
  }
  head() {
    return this.spine[this.spine.length - 1];
  }
  move() {
    // moves according to bearing
    let { x, y } = snake.head(); // gets head
    if (snake.bearing === 'north') y--; // updates values
    if (snake.bearing === 'east') ++x;
    if (snake.bearing === 'south') y++;
    if (snake.bearing === 'west') x--;
    // adds new values to spine, returns oldest vertebrae for removal
    // return this.spine.push({ x, y }) && this.spine.shift();
    this.spine.push({ x, y });
    this.trail = this.spine.shift();
  }
  grow() {
    const { x, y } = this.spine[0];
    this.spine.unshift({ x, y });
  }
}
