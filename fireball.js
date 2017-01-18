class Fireball {
  constructor(startingCoord, bearing) {
    // console.log('starting', startingCoord)
    this.bearing = bearing;
    this.loc = [startingCoord]; // loc is a sack of length 1 (one fireball for now)
    this.trail = null;
  }
  currentLocation() {
    return this.loc[0];
  }
  move() {
    // moves according to bearing
    let { x, y } = this.loc[0]; // get current location
    if (this.bearing === 'north') y -= 3; // update values
    if (this.bearing === 'east') x += 3;
    if (this.bearing === 'south') y += 3;
    if (this.bearing === 'west') x -= 3;
    // add new values to loc, remove old to be painted over
    this.loc.push({ x, y });
    this.trail = this.loc.shift();
  }
}
