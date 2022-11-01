import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleEnum } from '../models/enums/roleEnum';
import { Role } from '../models/role';



const URL_SIGNIN = environment.URL_API + "/signin";
const URL_GET_ROLE_BY_USERNAME = environment.URL_API + "/user/role";
const URL_GET_USER_LIST = environment.URL_API + '/user/all';

@Injectable()
  //root SharedModule // {providedIn: 'root'}
export class UserService {


  userList : any[] = [];
  user: User = new User(-1, '', 'token', new Role(3, RoleEnum.ROLE_USER), 'nothing', []);
  isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {

   }


/*
  is_authenticated(): boolean {
    //return this.user.token !== "token"; // TODO modifier
    return this.isAuthenticated;
  }*/



  login(username: string, password: string): void {
    //let token = '';
    //const role = new Role(3, RoleEnum.ROLE_USER);
    this.user = new User(-9999, username, '', new Role(3, RoleEnum.ROLE_USER), '', []);
    const body = {
      "username": username,
      "password": password
    }

    this.http.post<any>(URL_SIGNIN, body, { observe: 'response' }).subscribe(
      (response) => {
        const extractedToken = response.body.authToken;
        this.user.token = extractedToken;
        this.isAuthenticated = true;
        this.redirect();
      },
      (error) => {
        this.isAuthenticated = false;
        console.log('error :', error);
      }
    );
  }


  logout() {
    const role = new Role(3, RoleEnum.ROLE_USER);
    this.user = new User(-9999, '', '', role, '', []);
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }

  redirect(): void {
    // requete pour recuperer le role par son pseudo
    const headers = { 'Authorization': 'Bearer ' + this.user.token };

    let resp = this.http.get<any>(URL_GET_ROLE_BY_USERNAME + "/" + this.user.userName, { observe: 'response', headers: headers }).subscribe(
      (response) => {
        const extractedRole = response.body.label;
        this.user.role = extractedRole;
        switch (extractedRole) {
          case 'ROLE_ADMIN':
            this.router.navigate(['admin']);
            break;
          case 'ROLE_MANAGER':
            this.router.navigate(['manager']);
            break;
          case 'ROLE_USER':
            this.router.navigate(['user']);
            break;
        }
      }
    );
  }

  getRoleByUsername() : any {
    let toReturn = "";
    const headers = { 'Authorization': 'Bearer ' + this.user.token };
    let resp = this.http.get<any>(URL_GET_ROLE_BY_USERNAME + "/" + this.user.userName, { observe: 'response', headers: headers }).subscribe(
      (response) => {
        const extractedRole = response.body.label;
        return extractedRole;
      }
    );

    //return toReturn;
  }

  getUserList(): Observable<User[]> {
    const headers = { 'Authorization': 'Bearer ' + this.user.token };
    return this.http.get<User[]>(URL_GET_USER_LIST, {headers: headers });
  }
}
