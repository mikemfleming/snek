class Food {
  constructor() {
    this.types = ['nega', 'turbo', 'normie', 'bonus', 'quake'];
  }
  genFood() {
    const x = Math.floor(Math.random() * 19); // randomly generates a tile
    const y = Math.floor(Math.random() * 19); // grid is 20x20
    const type = this.types[Math.floor(Math.random() * (this.types.length))]; // randomly selects type
    return { x, y, type };
  }
}
