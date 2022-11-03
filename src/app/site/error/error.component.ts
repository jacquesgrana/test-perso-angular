import { Component, OnInit } from '@angular/core';
import { ErrorServiceService } from 'src/app/services/error-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(
    public userService : UserService,
    public errorService : ErrorServiceService
  ) {
   }

  ngOnInit(): void {
  }

}
