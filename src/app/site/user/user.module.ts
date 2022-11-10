import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';

const routes: Routes =
[
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
