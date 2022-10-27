import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

@Input() title !: string;

  constructor(public userService : UserService) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }

}
