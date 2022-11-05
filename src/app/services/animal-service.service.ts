import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Animal } from '../models/animal';
import { GenServiceService } from './gen-service.service';

@Injectable() // {providedIn: 'root'}
export class AnimalServiceService extends GenServiceService<Animal> { //
  override url = environment.URL_API + environment.URL_ANIMAL;
}
