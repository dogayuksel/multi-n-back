import { Modality } from './modalities/modality';

export class Round {
  results: Array<Modality> = [];

  constructor(modalities: Array<typeof Modality>) {
    for (let modalityMaker of modalities) {
      const modalityRound = new modalityMaker();
      modalityRound.setValue(this.getRandom(modalityRound.modalityDepth));
      this.results.push(modalityRound);
    }
  }

  getRandom(depth: number): number {
    return Math.floor(Math.random() * depth);
  }

  getModalityResults(): Array<Modality> {
    return this.results;
  }
}
