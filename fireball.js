class Fireball {
  constructor(startingCoord, bearing) {
    this.bearing = bearing;
    this.loc = startingCoord;
  }
  // head() {
  //   return this.loc[this.loc.length - 1];
  // }
  move(x, y) {
    const old = this.loc;
    this.loc = { x, y };
    return old;
  }
  // grow() {
  //   const { x, y } = this.loc[0];
  //   this.loc.unshift({ x, y });
  // }
}
