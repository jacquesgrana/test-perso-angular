import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user-service.service';

/*
const URL_API = "http://localhost:8090/api";
const URL_SIGNIN = URL_API + "/signin";
const URL_GET_USER_BY_USERNAME = URL_API + "/user/role"; // TODO corriger : URL_GET_ROLE_BY_USER
const URL_GET_USER_LIST = URL_API + '/user/all';
*/
@Injectable({
  providedIn: 'root'
})
export class GenServiceService<T extends { id?: number }> {

  protected url: string = environment.URL_API;
  protected headers = new HttpHeaders();

  constructor(
    protected http: HttpClient,
    private userService: UserService
    ) {
    //this.headers.set('Content-Type', 'application/json');
    //this.headers.set('Access-Control-Allow-Origin', '*');
    //this.headers.set('Authorization', 'Bearer ' + this.userService.user.token);

    this.headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + this.userService.user.token
    }
    );
  }

  /**
   * Ajout data
   * @param data
   * @returns
   */
  add(data: T): Observable<T> {
    return this.http.post<T>(this.url, data, { 'headers': this.headers })
  }

  /**
   * Update data
   * @param data
   * @returns
   */
  update(data: T): Observable<T> {
    return this.http.put<T>(`${this.url + '/' + data.id}`, data, { 'headers': this.headers });
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url + environment.URL_GET_LIST, { 'headers': this.headers });
  }

  getOne(id: number): Observable<T> {
    return this.http.get<T>(`${this.url + '/' + id}`, { 'headers': this.headers });
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.url + '/' + id}`, { 'headers': this.headers });
  }

}
