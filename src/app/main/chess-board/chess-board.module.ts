import {NgModule} from '@angular/core';
import {ChessBoardComponent} from './chess-board.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxChessBoardModule} from 'ngx-chess-board';

const routes: Routes = [{path: '', component: ChessBoardComponent}];

@NgModule({
  declarations: [ChessBoardComponent],
  imports: [RouterModule.forChild(routes), NgxChessBoardModule.forRoot()],
})
export class ChessBoardModule {}
