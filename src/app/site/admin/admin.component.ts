import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList !: any[];

  constructor(private router : Router,
    private route: ActivatedRoute,
    private userService: UserService) {
      //this.userList = this.userService.userList;
     }

  ngOnInit(): void {
    // charger la liste des users
    //this.userList = this.userService.getUserList();
    this.userService.getUserList().subscribe(
      data => {
        console.log('response body :', data);
        this.userList = data;
      }
    );
  }

}
