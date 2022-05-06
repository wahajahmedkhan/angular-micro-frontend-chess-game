import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChessBoardComponent} from './chess-board.component';
import {NgxChessBoardModule} from 'ngx-chess-board';
import {RouterTestingModule} from '@angular/router/testing';

describe('ChessBoardComponent', () => {
  let component: ChessBoardComponent;
  let fixture: ComponentFixture<ChessBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NgxChessBoardModule.forRoot(), RouterTestingModule],
      declarations: [ChessBoardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
