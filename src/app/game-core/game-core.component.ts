import { Component, OnInit } from '@angular/core';

import { Sequence } from './sequence';
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

  sequence: Sequence;
  nStepsBack: number = 1;
  modalityDepth: number = 4;
  modalitiesTotal: number = 2;

  userInput: Array<boolean> = [];
  correctSeries: boolean = true;

  startGame(): void {
    this.sequence = new Sequence(
      this.nStepsBack,
      this.modalityDepth,
      this.modalitiesTotal
    );
    this.correctSeries = this.sequence.goToNextRound(this.userInput);
    this.resetUserInput();
  }

  getDisplayRound(): Round {
    return this.sequence.getLastItem();
  }

  goToNext(): void {
    this.correctSeries = this.sequence.goToNextRound(this.userInput);
    this.resetUserInput();
  }

  resetUserInput(): void {
    this.userInput = [];
    for (let i = 0; i < this.modalitiesTotal; i++) {
      this.userInput.push(false);
    }
  }

  setUserInput(modalityIdx: number): void {
    this.userInput[modalityIdx] = !this.userInput[modalityIdx];
  }

}
