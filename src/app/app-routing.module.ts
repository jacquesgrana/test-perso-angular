import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './site/admin/admin.component';
import { LoginComponent } from './site/login/login.component';
import { ManagerComponent } from './site/manager/manager.component';
import { UserComponent } from './site/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './site/error/error.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', //redirectTo: 'login'
    component: ErrorComponent
  }
];
/**
 * useHash ajouté our éviter le rechargement de l'app quand on change l'url manuellement
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
