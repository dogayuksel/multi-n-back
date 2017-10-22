import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'game-core',
    templateUrl: './game-core.component.html',
    styleUrls: ['./game-core.component.css']
})
export class GameCoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sequence = [];
  modalitiesTotal = 2;
  nStepsBack = 1;
  modalityDepth = 4;

  userInput = [];
  correctSeries = true;

  resetUserInput(): void {
    this.userInput = [];
    for (let i = 0; i < this.modalitiesTotal; i++) {
      this.userInput.push(false);
    }
  }

  setUserInput(modalityIdx: number): void {
    this.userInput[modalityIdx] = !this.userInput[modalityIdx];
  }

  startGame(): void {
    this.sequence = [];
    this.resetUserInput();
    this.goToNext();
  }

  getRandom(): number {
    return Math.floor(Math.random() * this.modalityDepth);
  }

  checkUserInput(): boolean {
    for (let i = 0; i < this.modalitiesTotal; i++) {
      const valuePast = this.sequence[this.sequence.length - this.nStepsBack - 1][i];
      const valueNow = this.sequence[this.sequence.length - 1][i];
      if (valuePast === valueNow) {
        if (!this.userInput[i]) {
          console.log('returns false');
          return false;
        }
      }
    }
    return true;
  }

  goToNext(): void {
    if (this.sequence.length > this.nStepsBack) {
      this.correctSeries = this.checkUserInput();
      this.resetUserInput();
    }
    const currentModalityParams = [];
    for (let i = 0; i < this.modalitiesTotal; i++) {
      currentModalityParams.push(this.getRandom());
    }
    this.sequence.push(currentModalityParams);
  }

  getLastItem(): Array<number> {
    return this.sequence[this.sequence.length - 1];
  }

}
