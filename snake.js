class Snake {
  constructor() {
    this.bearing = 'east';
    this.spine = [{ x: 7, y: 9 },
                  { x: 8, y: 9 },
                  { x: 9, y: 9 }];
  }
  head() {
    return this.spine[this.spine.length - 1];
  }
  move(x, y) {
    return this.spine.push({ x, y }) && this.spine.shift();
  }
  grow() {
    const { x, y } = this.spine[0];
    this.spine.unshift({ x, y });
  }
}
