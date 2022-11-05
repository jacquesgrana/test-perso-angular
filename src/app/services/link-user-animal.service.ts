import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from './user-service.service';
import { ErrorServiceService } from './error-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';




@Injectable()
export class LinkUserAnimalService {

  private URL_LINK = environment.URL_API + '/admin/user/link/animal';
  private URL_UNLINK = environment.URL_API + '/admin/user/unlink/animal';
  protected headers = new HttpHeaders();

  constructor(
    protected http: HttpClient,
    private userService: UserService,
    private errorService: ErrorServiceService,
    private router: Router
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.userService.user.token
    });
  }

  linkAnimalToUser(idUser: number, idAnimal: number): Observable<any> {
    const dto = {
      idUser: idUser,
      idAnimal: idAnimal
    }
    return this.http.post<any>(this.URL_LINK, dto, {'headers': this.headers});
  }

  unlinkAnimalToUser(idUser: number, idAnimal: number): Observable<any> {
    const dto = {
      idUser: idUser,
      idAnimal: idAnimal
    }
    return this.http.post<any>(this.URL_UNLINK, dto, {'headers': this.headers});
  }
}
