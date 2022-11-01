import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../services/user-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    /*
          if(this.userService.isAuthenticated && this.userService.user.token !== '') {
            return true;
          }
          else {
            this.router.navigate(['login']);
            return false;
          }
    */

    console.log('is auth :', this.userService.isAuthenticated);
    console.log('token :', this.userService.user.token);



    if (this.userService.isAuthenticated && this.userService.user.token !== '') {
      // TODO checker les droits?? selon la route demandée?
      // requete pour recuperer les droits
      //const role = this.userService.getRole();
      //console.log('guard : route :', route.toString());

      const role = this.userService.user.role.toString();
      console.log('guard : role :', role);
      switch (role) {
        case 'ROLE_ADMIN':
          if (route.url.toString() == 'admin') {
            console.log('guard : admin sur la bonne page');
            return true;
          }
          else {
            console.log('guard : admin sur la mauvaise page');
            this.router.navigate(['admin']);
            return false;
          }
          break;
        case 'ROLE_MANAGER':
          if (route.url.toString() == 'manager') {
            console.log('guard : manager sur la bonne page');
            return true;
          }
          else {
            console.log('guard : manager sur la mauvaise page');
            this.router.navigate(['manager']);
            return false;
          }
          break;
        case 'ROLE_USER':
          if (route.url.toString() == 'user') {
            console.log('guard : user sur la bonne page');
            return true;
          }
          else {
            console.log('guard : user sur la mauvaise page');
            this.router.navigate(['user']);
            return false;
          }
          break;
      }

    }
    else {
      console.log('guard : non loggé');

      this.router.navigate(['login']);
      return false;
    }
    return false;
  }

}
