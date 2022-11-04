import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnimalType } from '../models/animal-type';
import { GenServiceService } from './gen-service.service';

@Injectable()
export class AnimalTypeServiceService extends GenServiceService<AnimalType> {
  override url = environment.URL_API + environment.URL_ANIMAL_TYPE;

  

}
