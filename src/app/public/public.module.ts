import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '404'},
];

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [RouterModule.forChild(routes)],
})
export class PublicModule {}
