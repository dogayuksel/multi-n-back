import { Round } from './round';

export class Sequence {

  roundHistory: Array<Round>;
  nStepsBack: number;
  modalityDepth: number;
  modalitiesTotal: number;

  constructor(nStepsBack, modalityDepth, modalitiesTotal) {
    this.roundHistory = [];
    this.nStepsBack = nStepsBack;
    this.modalityDepth = modalityDepth;
    this.modalitiesTotal = modalitiesTotal;
  }

  goToNextRound(userInput: Array<boolean>): boolean {
    let answer = true;
    if (this.getLength() > this.nStepsBack) {
      answer = this.compareRoundHistoryToUserInput(userInput);

    }
    const thisRound = new Round(this.modalityDepth);
    this.roundHistory.push(thisRound);
    return answer
  }

  compareRoundHistoryToUserInput(userInput): boolean {
    for (let i = 0; i < this.modalitiesTotal; i++) {
      let valuePast = this.getNthLastItem(this.nStepsBack).getParams()[i];
      let valueNow = this.getLastItem().getParams()[i];
      if (valuePast === valueNow) {
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

  getLastItem(): Round {
    return this.roundHistory[this.getLength() - 1];
  }

  getNthLastItem(n: number): Round {
    return this.roundHistory[this.getLength() - n - 1];
  }

  getLength(): number {
    return this.roundHistory.length;
  }

}
