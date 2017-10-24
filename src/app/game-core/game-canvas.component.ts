import { Component, Input } from '@angular/core';

import { Round } from './round';

const Color = {
  0: "#d11",
  1: "#1d1",
  2: "#11d",
  3: "#d1d",
};

@Component({
  selector: 'game-canvas',
  template: `
<div>
<div class='row'>
<div class="tile col-0"
[style.background-color]="getColor(0)">
</div>
<div class="tile col-1"
[style.background-color]="getColor(1)">
</div>
</div>
<div class='row'>
<div class="tile col-2"
[style.background-color]="getColor(2)">
</div>
<div class="tile col-3"
[style.background-color]="getColor(3)">
</div>
</div>
</div>
`,
  styles: [`
.tile {
background-color: #ddd;
height: 2em;
width: 2em;
margin: 1em;
}
[class*='col-'] {
display: inline-block;
}
.selected {
background-color: #121;
}
`]
})

export class GameCanvasComponent {

  @Input() round: Round;

  getPosition(): number {
    return this.round.getParams()[0];
  }

  getColor(position: number): string {
    if (position == this.getPosition()) {
      return Color[this.round.getParams()[1]];
    }
    return "#dde";
  }
}
