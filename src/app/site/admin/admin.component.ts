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
  displayedColumns: string[] = ['id', 'name', 'role', 'nb-animals', 'actions']; //, 'nb-animals'
  displayedAnimalsColumns: string[] = ['id', 'name', 'type', 'genre', 'birth', 'actions'];

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

  editUser(user : any) {
    console.log('edit user : ' + user);
  }

  deleteUser(user : any) {
    console.log('delete user : ' + user);
  }

  editAnimal(animal : Animal) {
    console.log('edit animal : ' + animal);
  }

  deleteAnimal(animal: Animal) {
    console.log('delete animal : ' + animal);
  }

}
