import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {RegisterComponent} from './register/register.component';
import {MaterialModule} from '../shared/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: '', redirectTo: 'register', pathMatch: 'full'},
      {path: 'register', component: RegisterComponent},
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, ReactiveFormsModule],
  declarations: [RegisterComponent, AuthComponent],
})
export class AuthModule {}
