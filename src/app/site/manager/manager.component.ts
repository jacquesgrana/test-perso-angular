import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { AnimalType } from 'src/app/models/animal-type';
import { User } from 'src/app/models/user';
import { AnimalServiceService } from 'src/app/services/animal-service.service';
import { AnimalTypeServiceService } from 'src/app/services/animal-type-service.service';
import { ErrorServiceService } from 'src/app/services/error-service.service';
import { RoleServiceService } from 'src/app/services/role-service.service';
import { UserService } from 'src/app/services/user-service.service';
import { EditAnimalTypeComponent } from '../shared/edit-animal-type/edit-animal-type.component';
import { EditAnimalComponent } from '../shared/edit-animal/edit-animal.component';
import { EditUserComponent } from '../shared/edit-user/edit-user.component';
import { ManageAnimalLinksComponent } from '../shared/manage-animal-links/manage-animal-links.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  userList !: User[];
  animalList !: Animal[];
  animalTypeList !: AnimalType[];
  displayedUsersColumns: string[] = ['name', 'role', 'nb-animals', 'actions'];
  displayedAnimalsColumns: string[] = ['name', 'type', 'genre', 'birth', 'actions'];
  displayedAnimalTypesColumns: string[] = ['label', 'actions'];

  user!: User;
  animal !: Animal;
  animalType!: AnimalType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private animalService: AnimalServiceService,
    private animalTypeService: AnimalTypeServiceService,
    private errorService: ErrorServiceService,
    public roleService: RoleServiceService,
    public dialogUser: MatDialog,
    public dialogAnimal: MatDialog,
    public dialogAnimalType: MatDialog,
    public dialogAnimalLinks: MatDialog,
    public dialogConfirm: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserList();
    this.getAnimalList();
    this.getAnimalTypeList();
  }

  getUserList(): void {
    this.userService.getUserList().subscribe(
      data => {
        this.userList = data;
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  getAnimalList(): void {
    this.animalService.getAll().subscribe(
      data => {
        this.animalList = data;
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  getAnimalTypeList(): void {
    this.animalTypeService.getAll().subscribe(
      data => {
        this.animalTypeList = data;
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  editUser(user: User) {
    this.openEditUser('Editer User', false, user);
  }

  editAnimal(animal: Animal) {
    this.openEditAnimal('Editer un animal', false, animal);
  }

  editAnimalType(animalType: AnimalType) {
    this.openEditAnimalType('Editer un Type d\'animal', false, animalType);
  }

  openEditUser(title: string, isUserCreation: boolean, user: User): void {
    const dialogRefUser = this.dialogUser.open(EditUserComponent, {
      disableClose: true,
      panelClass: ['dialog'],
      data: { title: title, isUserCreation: isUserCreation, user: user }
    });
  }

  openEditAnimal(title: string, isAnimalCreation: boolean, animal: Animal): void {
    const dialogRefUser = this.dialogAnimal.open(EditAnimalComponent, {
      disableClose: true,
      panelClass: ['dialog'],
      data: { title: title, isAnimalCreation: isAnimalCreation, animal: animal }
    });
  }

  openEditAnimalType(title: string, isAnimalTypeCreation: boolean, animalType: AnimalType): void {
    const dialogRefUser = this.dialogAnimalType.open(EditAnimalTypeComponent, {
      disableClose: true,
      panelClass: ['dialog'],
      data: { title: title, isAnimalTypeCreation: isAnimalTypeCreation, animalType: animalType }
    });
  }

  manageAnimalsForUser(user: User) {
    console.log('manage animals for user :', user.userName);
    const dialogRefUser = this.dialogAnimalLinks.open(ManageAnimalLinksComponent, {
      disableClose: true,
      panelClass: ['dialog'],
      data: { user: user }
    });
    dialogRefUser.afterClosed().subscribe(data => {
      this.getUserList();
    }
    );
  }
}
