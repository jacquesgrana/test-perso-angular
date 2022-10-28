import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { AnimalServiceService } from 'src/app/services/animal-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userList !: any[];
  animalList !: Animal[];
  displayedColumns: string[] = ['id', 'name', 'role'];
  displayedAnimalsColumns: string[] = ['id', 'name', 'type', 'genre', 'birth'];

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private animalService: AnimalServiceService
    ) {
     }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(
      data => {
        //console.log('response body :', data);
        this.userList = data;
      }
    );

    this.animalService.getAll().subscribe( // .getAnimalList()
      data => {
        //console.log('data animal :', data);
        this.animalList = data;
      }
    );
  }

}
