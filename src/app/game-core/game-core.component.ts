import { Component, OnInit } from '@angular/core';

import Modalities from './modalities';

import { Modality } from './modalities/modality';
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
    this.modalities = Modalities;
    for (let modality of this.modalities) {
      this.useModality.push(true);
    }
    this.startGame();
  }

  sequence: Sequence;
  nStepsBack: number = 1;
  nStepOptions = [1, 2, 3, 4];
  modalities: Array<typeof Modality>;
  useModality: Array<boolean> = [];

  maxRounds: number = 1;

  userInput: Array<boolean> = [];
  correctSeries: boolean = true;

  startGame(): void {
    this.sequence = new Sequence(
      this.nStepsBack,
      this.modalities.filter((obj, idx) => this.useModality[idx])
    )
    this.correctSeries = this.sequence.goToNextRound(this.userInput);
    this.resetUserInput();
  }

  getDisplayRound(): Round {
    return this.sequence.getLastRound();
  }

  goToNext(): void {
    this.correctSeries = this.sequence.goToNextRound(this.userInput);
    const finalScore = this.sequence.getLength();
    if (this.maxRounds < finalScore) {
      this.maxRounds = finalScore;
    }
    this.resetUserInput();
    if (!this.correctSeries) {
      this.startGame();
    }
  }

  resetUserInput(): void {
    this.userInput = [];
    for (let i = 0; i < this.modalities.length; i++) {
      this.userInput.push(false);
    }
  }

  getUserInput(modalityIdx: number): boolean {
    return this.userInput[modalityIdx];
  }

  setUserInput(modalityIdx: number): void {
    this.userInput[modalityIdx] = !this.userInput[modalityIdx];
  }

}
