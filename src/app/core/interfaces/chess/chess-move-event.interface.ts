import {MoveChange} from 'ngx-chess-board';

export interface ChessMoveEventInterface extends MoveChange {
  move: string;
}
