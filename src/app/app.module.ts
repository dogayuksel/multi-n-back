import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameCoreComponent } from './game-core/game-core.component';
import { GameCanvasComponent } from './game-core/game-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCoreComponent,
    GameCanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
