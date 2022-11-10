import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { RoleEnum } from 'src/app/models/enums/roleEnum';
import { User } from 'src/app/models/user';
import { AnimalServiceService } from 'src/app/services/animal-service.service';
import { ErrorServiceService } from 'src/app/services/error-service.service';
import { LinkUserAnimalService } from 'src/app/services/link-user-animal.service';
import { UserService } from 'src/app/services/user-service.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RoleServiceService } from 'src/app/services/role-service.service';



@Component({
  selector: 'app-manage-animal-links',
  templateUrl: './manage-animal-links.component.html',
  styleUrls: ['./manage-animal-links.component.scss']
})
export class ManageAnimalLinksComponent implements OnInit {

  displayedAnimalsColumns: string[] = ['name', 'type', 'genre', 'actions'];
  displayedAnimalsColumnsManager: string[] = ['name', 'type', 'genre'];

  animalList: Animal[] = [];
  animalListFromUSer: Animal[] = [];

  //animalListFromUSer = new MatTableDataSource<Animal>();
  animalListOrphans: Animal[] = [];

  userList: User[] = [];

  user!: User;

  @ViewChild(MatTable) tableUser!: MatTable<Animal>;
  @ViewChild(MatTable) tableOrphans!: MatTable<Animal>;

  constructor(

    public userService : UserService,
    public roleService: RoleServiceService,
    private animalService: AnimalServiceService,
    private linkUserAnimalService: LinkUserAnimalService,
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
    this.getAnimalListFromUser();
    //console.log('on init manage animal link, token :', this.user.token);
    //console.log('on init manage animal link, user :', this.user);


    this.getAnimalListOrphans();

  }
/*
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
  }*/



  getAnimalListFromUser(): void {
    if (this.user.animals.length > 0) {
      this.animalListFromUSer = this.user.animals;
    }
  }

  getAnimalListOrphans(): void {
/*
    let animalListPossessed: Set<Animal> = new Set<Animal>();
    this.userList.forEach(u => {
      if (u.animals.length > 0) {
        u.animals.forEach(a => {
          animalListPossessed.add(a);
        });
      }
    });
    const animalTempListPossessed: Animal[] = Array.from(animalListPossessed);
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
    }*/


    this.animalService.getOrphansAnimals().subscribe(
      (response) => {
        this.animalListOrphans = response as Animal[];
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }


  onNoClick() {
    this.dialogRef.close();
  }

  linkAnimal(animal: Animal): void {
    this.linkUserAnimalService.linkAnimalToUser(this.user.id, animal.id).subscribe(
      data => {
        //alert('Link ok');
        let tempData = [...this.animalListFromUSer];
        tempData.push(animal);
        this.animalListFromUSer = tempData;
       //this.animalListFromUSer.push(animal);
        this.tableUser.renderRows();

        this.animalListOrphans = this.animalListOrphans.filter(a => a.id !== animal.id);
        this.tableOrphans.renderRows();
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.dialogRef.close();
        this.router.navigate(['error']);
      }
    );
  }

  unlinkAnimal(animal: Animal): void {
    this.linkUserAnimalService.unlinkAnimalToUser(this.user.id, animal.id).subscribe(
      data => {
        //alert('Unlink ok');
        let tempData = [...this.animalListOrphans];
        tempData.push(animal);
        this.animalListOrphans = tempData;
        //this.animalListOrphans.push(animal);
        this.tableOrphans.renderRows();

        this.animalListFromUSer = this.animalListFromUSer.filter(a => a.id !== animal.id);
        this.tableUser.renderRows();
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.dialogRef.close();
        this.router.navigate(['error']);
      }
    );
  }
}
