import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes =
[
  { path: 'manager', component: ManagerComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ManagerModule { }
