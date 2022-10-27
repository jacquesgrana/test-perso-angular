import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


const URL_API = "http://localhost:8090/api";
const URL_SIGNIN = URL_API + "/signin";
const URL_GET_USER_BY_USERNAME = URL_API + "/user/role";
const URL_GET_USER_LIST = URL_API + '/user/all';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userList : any[] = [];
  user: User = new User(-9999.9, 'nothing', 'nothing', "user");
  isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private router: Router) {

   }



  is_authenticated(): boolean {
    //return this.user.token !== "token"; // TODO modifier


    return this.isAuthenticated;
  }



  login(pseudo: string, password: string): string {
    let token = "token";
    this.user = new User(-9999.9, pseudo, token, "user");
    const body = {
      "username": pseudo,
      "password": password
    }
    //const result = this.http.post<any>(URL_SIGNIN, body);
    //console.log("result :", result);
    //const data = result.subscribe(d => d.headers.get("Authorization"));
    //console.log("data :", data);

    this.http.post<any>(URL_SIGNIN, body, { observe: 'response' }).subscribe(
      (response) => {
        const extractedToken = response.body.authToken;
        //console.log("token :", extractedToken);
        this.user.token = extractedToken;
        //token = extractedToken;
        this.isAuthenticated = true;

        this.redirect();
        // diriger selon les roles
        //this.router.navigate(['admin']);

      },
      (error) => {
        this.isAuthenticated = false;
        console.log('error :', error);
      }
    );
    return token;
  }


  logout() {
    this.user = new User(-9999.9, 'nothing', 'nothing', "user");
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }

  redirect(): void {
    // requete pour recuperer le role par son pseudo
    const headers = { 'Authorization': 'Bearer ' + this.user.token };

    let resp = this.http.get<any>(URL_GET_USER_BY_USERNAME + "/" + this.user.username, { observe: 'response', headers: headers }).subscribe(
      (response) => { //JSON.parse(JSON.stringify(response))
        const extractedRole = response.body.label;
        //console.log('role : ', extractedRole);
        this.user.role = extractedRole;

        switch (extractedRole) {
          case 'ROLE_ADMIN':
            //this.userList = this.getUserList();
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
    // affectation de l'id de l'user et du role
    // selon le role diriger vers la bonne page
    //this.router.navigate(['admin']);
  }

  getRole() : any {
    let toReturn = "";
    const headers = { 'Authorization': 'Bearer ' + this.user.token };
    let resp = this.http.get<any>(URL_GET_USER_BY_USERNAME + "/" + this.user.username, { observe: 'response', headers: headers }).subscribe(
      (response) => {
        const extractedRole = response.body.label;
        return extractedRole;
      }
    );

    //return toReturn;
  }

  getUserList(): Observable<User[]> {
    //let toReturn: any[] = [];
    const headers = { 'Authorization': 'Bearer ' + this.user.token };
    /*
    let req = this.http.get<any>(URL_GET_USER_LIST, { observe: 'response', headers: headers }).subscribe(
      (response) => {
        console.log('response body :', response.body);
        return response.body;
      }
    );*/


    return this.http.get<User[]>(URL_GET_USER_LIST, {headers: headers });
    //return toReturn;
  }
}
