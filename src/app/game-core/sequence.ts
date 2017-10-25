import { Modality } from './modalities/modality';

import { Round } from './round';

export class Sequence {

  roundHistory: Array<Round>;
  nStepsBack: number;
  modalities: Array<typeof Modality>;

  constructor(nStepsBack, modalities) {
    this.roundHistory = [];
    this.nStepsBack = nStepsBack;
    this.modalities = modalities;
  }

  goToNextRound(userInput: Array<boolean>): boolean {
    let answer = true;
    if (this.getLength() > this.nStepsBack) {
      answer = this.compareRoundHistoryToUserInput(userInput);
    }
    const thisRound = new Round(this.modalities);
    this.roundHistory.push(thisRound);
    return answer
  }

  compareRoundHistoryToUserInput(userInput): boolean {

    const pastResults = this.getNthLastRound().getModalityResults();
    const currentResults = this.getLastRound().getModalityResults();

    for (let i = 0; i < this.modalities.length; i++) {
      if (pastResults[i].getValue() === currentResults[i].getValue()) {
        if (!userInput[i]) {
          return false;
        }
      }
      else {
        if (userInput[i]) {
          return false;
        }
      }
    }
    return true;
  }

  getLastRound(): Round {
    return this.roundHistory[this.getLength() - 1];
  }

  getNthLastRound(): Round {
    return this.roundHistory[this.getLength() - this.nStepsBack - 1];
  }

  getLength(): number {
    return this.roundHistory.length;
  }

}
