import {Component, HostListener, ViewChild} from '@angular/core';
import {
  ChessMoveEventInterface,
  CrossWindowCommunicationService,
  CrossWindowEventInterface,
  WindowEventEnum,
  WindowIdEnum,
} from '@app-core';
import {MoveChange, NgxChessBoardView} from 'ngx-chess-board';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.scss'],
})
export class ChessBoardComponent {
  @ViewChild('board', {static: false}) board: NgxChessBoardView;
  isDark = false;
  id: WindowIdEnum;
  lastMove: string;

  constructor(private crossWindowCom: CrossWindowCommunicationService) {
  }

  @HostListener('window:message', ['$event'])
  onMessage(e: {data: CrossWindowEventInterface<any>}): void {
    switch (e.data.event) {
      case WindowEventEnum.reset:
        this.board.reset();
        this.isDark ? this.board.reverse() : null;
        break;
      case WindowEventEnum.configuration:
        this.id = e.data.data.id;
        this.isDark = e.data.data.isDark;
        // eslint-disable-next-line no-case-declarations
        const moves = localStorage.getItem('moves');
        if (moves) {
          this.board.setFEN(moves);
        }
        this.isDark ? this.board.reverse() : null;
        break;
      case WindowEventEnum.move:
        return this.board.move(e.data.data.move);
      default:
        break;
    }
  }

  reset(): void {
    this.board.reset();
  }

  move(cords: string): void {
    this.board.move(cords);
  }


  moveChange(changeEvent: MoveChange) {
    const event = changeEvent as ChessMoveEventInterface;
    this.lastMove = event.move;
    this.crossWindowCom.postMessage(window.parent, {
      data: {move: event.move},
      event: WindowEventEnum.move,
      srcId: this.id,
      targetId: WindowIdEnum.parent,
    });
    if (event.checkmate) {
      this.crossWindowCom.postMessage(window.parent, {
        data: {},
        event: WindowEventEnum.checkMate,
        srcId: this.id,
        targetId: WindowIdEnum.parent,
      });
    }
    localStorage.setItem('moves', this.board.getFEN());
  }
}
