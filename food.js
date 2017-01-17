class Food {
  constructor() {
    this.types = ['nega', 'quake', 'turbo', 'normie', 'bonus'];
  }
  genFood() {
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 19);
    const type = this.types[Math.floor(Math.random() * (this.types.length))];
    return { x, y, type };
  }
}
