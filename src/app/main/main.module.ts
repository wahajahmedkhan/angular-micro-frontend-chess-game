import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {FrameComponent} from './frame/frame.component';
import {MaterialModule} from '../shared/material/material.module';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'chess-board', loadChildren: () => import('./chess-board/chess-board.module').then(m => m.ChessBoardModule)},
];

@NgModule({
  declarations: [MainComponent, FrameComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class MainModule {}
