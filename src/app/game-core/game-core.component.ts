import { Component, OnInit } from '@angular/core';

import { Round } from './round';

@Component({
  selector: 'game-core',
  templateUrl: './game-core.component.html',
  styleUrls: ['./game-core.component.css']
})

export class GameCoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.startGame();
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

  checkUserInput(): boolean {
    for (let i = 0; i < this.modalitiesTotal; i++) {
      const valuePast = this.getNthLastItem(this.nStepsBack)[i];
      const valueNow = this.getLastItem()[i];
      if (valuePast === valueNow) {
        if (!this.userInput[i]) {
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
    const thisRound = new Round(this.modalityDepth);
    this.sequence.push(thisRound.getParams());
  }

  getLastItem(): Array<number> {
    return this.sequence[this.sequence.length - 1];
  }

  getNthLastItem(n: number): Array<number> {
    return this.sequence[this.sequence.length - n - 1];
  }

}
