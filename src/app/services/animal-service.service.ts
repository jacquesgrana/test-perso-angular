import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../models/animal';
import { GenServiceService } from './gen-service.service';

@Injectable() // {providedIn: 'root'}
export class AnimalServiceService extends GenServiceService<Animal> { //
  override url = environment.URL_API + environment.URL_ANIMAL;


  getOrphansAnimals(): Observable<Animal[]> {

    //this.userService.user.token
    //console.log('get orphans animal, token : ', this.userService.user.token);

    return this.http.get<Animal[]>(this.url + environment.URL_ORPHANS, {headers: this.headers });
  }

}
