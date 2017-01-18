class Food {
  constructor() {
    this.types = ['nega', 'turbo', 'normie', 'bonus', 'dragon', 'quake'];
  }
  genFood() {
    const x = Math.floor(Math.random() * 19);
    const y = Math.floor(Math.random() * 19);
    const type = this.types[Math.floor(Math.random() * 5)];
    return { x, y, type };
  }
}
