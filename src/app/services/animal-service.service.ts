import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Animal } from '../models/animal';
import { GenServiceService } from './gen-service.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalServiceService extends GenServiceService<Animal> { //
  override url = environment.URL_API + environment.URL_ANIMAL;

  /*
  getAnimalList(): Observable<Animal[]> {
    //console.log('headers :', this.headers.get('Authorization'));
    //console.log('url :', this.url + environment.URL_GET_LIST);
    return this.http.get<Animal[]>(this.url + environment.URL_GET_LIST, {headers: this.headers });
  }*/
}
