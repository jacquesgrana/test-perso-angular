import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userService.is_authenticated()) {
      // TODO checker les droits?? selon la route demandée?
      // requete pour recuperer les droits
      //const role = this.userService.getRole();
      //console.log('guard : route :', route.toString());

      const role = this.userService.user.role.toString();
      //console.log('guard : role :', role);
      switch (role) {
        case 'ROLE_ADMIN':
          if (route.url.toString() == 'admin') {
            return true;
          }
          break;
        case 'ROLE_MANAGER':
          if (route.url.toString() == 'manager') {
            return true;
          }
          break;
        case 'ROLE_USER':
          if (route.url.toString() == 'user') {
            return true;
          }
          break;
      }

      //return true;
    }
    return this.router.parseUrl('/login');
    //return this.router.navigate(['login']);
  }

}
