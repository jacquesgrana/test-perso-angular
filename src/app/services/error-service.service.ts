import { Injectable } from '@angular/core';

@Injectable()
export class ErrorServiceService {

  status: string = 'Statut Générique';
  comment: string = 'Commentaire Générique';

  constructor() { }

  setError(status: string, comment: string): void {
    this.status = status;
    this.comment = comment;
  }
}
