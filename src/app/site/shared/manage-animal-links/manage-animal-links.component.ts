import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { RoleEnum } from 'src/app/models/enums/roleEnum';
import { User } from 'src/app/models/user';
import { AnimalServiceService } from 'src/app/services/animal-service.service';
import { ErrorServiceService } from 'src/app/services/error-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-manage-animal-links',
  templateUrl: './manage-animal-links.component.html',
  styleUrls: ['./manage-animal-links.component.scss']
})
export class ManageAnimalLinksComponent implements OnInit {

  displayedAnimalsColumns: string[] = ['name', 'type', 'genre', 'actions'];

  animalList: Animal[] = [];
  animalListFromUSer: Animal[] = [];
  animalListOrphans: Animal[] = [];

  userList: User[] = [];

  user!: User;

  constructor(
    private userService: UserService,
    private animalService: AnimalServiceService,
    private errorService: ErrorServiceService,
    private router: Router,
    public dialogRef: MatDialogRef<ManageAnimalLinksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: {
        id: 0,
        userName: '',
        token: '',
        role: { id: 3, label: RoleEnum.ROLE_USER },
        password: '',
        animals: []
      }
    }
  ) { }

  ngOnInit(): void {
    this.user = this.data.user;
    this.getUserList();
    this.getAnimalListFromUser();

  }

  getAnimalList(): void {
    this.animalService.getAll().subscribe( // .getAnimalList()
      data => {
        this.animalList = data;
        this.getAnimalListOrphans();
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  getUserList(): void {
    this.userService.getUserList().subscribe(
      data => {
        this.userList = data;
        this.getAnimalList();
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  getAnimalListFromUser(): void {
    if (this.user.animals.length > 0) {
      this.animalListFromUSer = this.user.animals;
    }
  }

  getAnimalListOrphans(): void {
    let animalListPossessed: Set<Animal> = new Set<Animal>();
    this.userList.forEach(u => {
      if (u.animals.length > 0) {
        //console.log('ajout des animaux de :', u.userName);

        u.animals.forEach(a => {
          animalListPossessed.add(a);
          //console.log('ajout de :', a.name);
        });
      }
    });
    //console.log('animaux possédés :', animalListPossessed);
    const animalTempListPossessed: Animal[] = Array.from(animalListPossessed);
    //console.log('liste totale des animaux :', this.animalList);

    //let animalSetOrphans: Set<Animal> = new Set<Animal>();

    //this.animalListOrphans = this.animalList.filter(a => !animalTempListPossessed.includes(a));
    for (let animalAll of this.animalList) {
      let isOut = true;
      for (let animalPoss of animalTempListPossessed) {
        if (animalAll.id === animalPoss.id) {
          isOut = isOut && false;
        }
        else {
          isOut = isOut && true;
        }

      }
      if (isOut) {
        this.animalListOrphans.push(animalAll);
      }
    }

    //this.animalListOrphans = Array.from(animalSetOrphans);
    //console.log('animaux orphelins : ', this.animalListOrphans);

  }


  onNoClick() {
    this.dialogRef.close();
  }

  unlinkAnimal(animal: Animal): void {

  }

  linkAnimal(animal: Animal): void {

  }
}
