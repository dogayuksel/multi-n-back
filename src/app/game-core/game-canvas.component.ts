import { Component, Input } from '@angular/core';

import { Round } from './round';

@Component({
  selector: 'game-canvas',
  template: `
<div class="tile-container">
<div *ngFor="let idx of createRange(this.positionDepth)"
class="tile">
<div class="col-{{idx}}"
[style.background-color]="getColor(idx)">
<mat-icon>{{getContent(idx)}}</mat-icon>
</div>
</div>
</div>
`,
  styles: [`
.tile-container {
margin: auto;
width: 12em;
display: flex;
flex-wrap: wrap;
}
.tile {
background-color: #ddd;
display: inline-block;
width: 52px;
margin: 0.8em;
}
mat-icon {
width: 52px;
height: 52px;
font-size: 3em;
}
[class*='col-'] {
height: 3em;
}
.selected {
background-color: #121;
}
`]
})

export class GameCanvasComponent {

  @Input() round: Round;

  position: number;
  positionDepth: number;
  color: string;
  iconName: string;

  ngOnChanges(changes) {
    const modalities = this.round.getModalityResults();
    for (let modality of modalities) {
      let param;
      if (modality.id === "position") {
        param = modality.getValue();
        this.position = parseInt(modality.mapParamToValue(param), 10);
        this.positionDepth = modality.modalityDepth;
      }
      else if (modality.id === "color") {
        param = modality.getValue();
        this.color = modality.mapParamToValue(param);
      }
      else if (modality.id === "shape") {
        param = modality.getValue();
        this.iconName = modality.mapParamToValue(param);
      }
    }
  }

  createRange(limit: number) {
    var items: number[] = [];
    for (var i = 0; i < limit; i++) {
      items.push(i);
    }
    return items;
  }

  getColor(position: number): string {
    if (position === this.position) {
      return this.color;
    }
    return "#dde";
  }

  getContent(position: number): string {
    if (position === this.position) {
      console.log(this.iconName);
      return this.iconName;
    }
    return "";
  }
}
