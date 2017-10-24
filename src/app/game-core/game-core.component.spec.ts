import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { GameCoreComponent } from './game-core.component';
import { GameCanvasComponent } from './game-canvas.component';

describe('GameCoreComponent', () => {
  let component: GameCoreComponent;
  let fixture: ComponentFixture<GameCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameCoreComponent,
        GameCanvasComponent
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a sequence', () => {
    expect(component.sequence).toBeTruthy();
  });
});
