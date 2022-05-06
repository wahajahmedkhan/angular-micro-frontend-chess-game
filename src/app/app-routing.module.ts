import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppGuard, AuthGuard} from '@app-core';

const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: 'auth', canActivate: [AppGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'app', canLoad: [AuthGuard], loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  {path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)},
  {path: '**', redirectTo: 'public'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
