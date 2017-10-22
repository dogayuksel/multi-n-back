export class Round {
  modalities: Array<string> = ["position", "color"];
  result: Array<number> = [];

  constructor(depth: number) {
    for (let i = 0; i < this.modalities.length; i++) {
      this.result.push(this.getRandom(depth));
    }
  }

  getRandom(depth: number): number {
    return Math.floor(Math.random() * depth);
  }

  getParams(): Array<number> {
    return this.result;
  }
}
