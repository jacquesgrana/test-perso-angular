import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { User } from 'src/app/models/user';
import { AnimalType } from 'src/app/models/animal-type';
import { AnimalServiceService } from 'src/app/services/animal-service.service';
import { UserService } from 'src/app/services/user-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditUserComponent } from '../shared/edit-user/edit-user.component';
import { RoleEnum } from 'src/app/models/enums/roleEnum';
import { Role } from 'src/app/models/role';
import { ErrorServiceService } from 'src/app/services/error-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AnimalTypeServiceService } from 'src/app/services/animal-type-service.service';
import { EditAnimalTypeComponent } from '../shared/edit-animal-type/edit-animal-type.component';
import { EditAnimalComponent } from '../shared/edit-animal/edit-animal.component';
import { Genre } from 'src/app/models/enums/genre';
import { ManageAnimalLinksComponent } from '../shared/manage-animal-links/manage-animal-links.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { RoleServiceService } from 'src/app/services/role-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  userList !: User[];
  animalList !: Animal[];
  animalTypeList !: AnimalType[];
  displayedUsersColumns: string[] = ['id', 'name', 'role', 'nb-animals', 'actions']; //, 'nb-animals'
  displayedAnimalsColumns: string[] = ['id', 'name', 'type', 'genre', 'birth', 'actions'];
  displayedAnimalTypesColumns: string[] = ['id', 'label', 'actions'];


  // TODO pour tester :
  //name!: string;
  color!: string;

  user!: User;
  animal !: Animal;
  animalType!: AnimalType;

  dialogRef!: MatDialogRef<ConfirmationDialogComponent>;

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
    public dialogConfirm: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

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

  addUser(): void {
    const user = new User(-1, '', '', new Role(3, RoleEnum.ROLE_USER), '', []);
    this.openEditUser('Ajouter User', true, user);
  }

  editUser(user: User) {
    this.openEditUser('Editer User', false, user);
  }

  deleteUser(user: User) {
    this.dialogRef = this.dialogConfirm.open(ConfirmationDialogComponent, {
      disableClose: true
    });
    this.dialogRef.componentInstance.confirmMessage = 'Voulez-vous vraiment effacer l\'utilisateur ' + user.userName + '?';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(
          (response) => {
            // TODO ajouter ouverture alert pour avertir que tout est ok
            console.log('delete request ok');
            this.openSnackBar('Utilisateur ' + user.userName + ' supprimé.', 'Fermer', 2000);
            this.getUserList();
          },
          (error: HttpErrorResponse) => {
            this.errorService.setError(error.statusText, error.message);
            this.router.navigate(['error']);
          }
        );
      }
      //this.dialogRef = null;
    });
  }

  addAnimal(): void {
    const animalType: AnimalType = new AnimalType(1, 'Chat');
    const birth: Date = new Date('1999-12-31');
    const animal = new Animal(
      -1,
      animalType,
      '',
      '',
      Genre.MALE,
      birth
    );
    this.openEditAnimal('Ajouter un animal', true, animal);
  }

  editAnimal(animal: Animal) {
    this.openEditAnimal('Editer un animal', false, animal);
  }

  deleteAnimal(animal: Animal) {
    this.dialogRef = this.dialogConfirm.open(ConfirmationDialogComponent, {
      disableClose: true
    });
    this.dialogRef.componentInstance.confirmMessage = 'Voulez-vous vraiment effacer l\'animal ' + animal.name + '?';

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.animalService.delete(animal.id).subscribe(
          (response) => {
            // TODO ajouter ouverture alert pour avertir que tout est ok
            console.log('delete animal request ok');
            this.openSnackBar('Animal ' + animal.name + ' supprimé.', 'Fermer', 2000);
            this.getAnimalList();
          },
          (error: HttpErrorResponse) => {
            this.errorService.setError(error.statusText, error.message);
            this.router.navigate(['error']);
          }
        );
      }
      //this.dialogRef = null;
    });
  }

  addAnimalType(): void {
    const animalType = new AnimalType(-1, '');
    this.openEditAnimalType('Ajouter un Type d\'animaux', true, animalType);
  }

  editAnimalType(animalType: AnimalType) {
    this.openEditAnimalType('Editer un Type d\'animaux', false, animalType);
  }

  deleteAnimalType(animalType: AnimalType) {
    this.dialogRef = this.dialogConfirm.open(ConfirmationDialogComponent, {
      disableClose: true
    });
    this.dialogRef.componentInstance.confirmMessage = 'Voulez-vous vraiment effacer le type d\'animal ' + animalType.label + '?';

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.animalTypeService.delete(animalType.id).subscribe(
          (response) => {
            console.log('delete animal type request ok');
            this.openSnackBar('Type d\'animal ' + animalType.label + ' supprimé.', 'Fermer', 2000);
            this.getAnimalTypeList();
          },
          (error: HttpErrorResponse) => {
            this.errorService.setError(error.statusText, error.message);
            this.router.navigate(['error']);
          }
        );
      }
      //this.dialogRef = null;
    });
  }

  /**
   * @param title
   * @param isUserCreation
   * @param isNewPassword
   * @param user
   */
  openEditUser(title: string, isUserCreation: boolean, user: User): void {
    const dialogRefUser = this.dialogUser.open(EditUserComponent, {
      disableClose: true,
      panelClass: ['dialog'],
      data: { title: title, isUserCreation: isUserCreation, user: user }
    });
    dialogRefUser.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.user = data.user;
        if (data.isUserCreation) {
          this.userService.createUser(this.user).subscribe(
            (response) => {
              console.log('post request ok');
              this.openSnackBar('Utilisateur ' + this.user.userName + ' ajouté.', 'Fermer', 2000);
              this.getUserList();
            },
            (error: HttpErrorResponse) => {
              this.errorService.setError(error.statusText, error.message);
              this.router.navigate(['error']);
            }
          );
        }
        else {
          this.userService.updateUser(this.user).subscribe(
            (response) => {
              console.log('put request ok');
              this.openSnackBar('Utilisateur ' + this.user.userName + ' mis à jour.', 'Fermer', 2000);
              this.getUserList();
            },
            (error: HttpErrorResponse) => {
              this.errorService.setError(error.statusText, error.message);
              this.router.navigate(['error']);
            }
          );
        }
      }
      else {
        console.log('user vide');
      }
    });
  }

  openEditAnimal(title: string, isAnimalCreation: boolean, animal: Animal): void {
    const dialogRefUser = this.dialogAnimal.open(EditAnimalComponent, {
      disableClose: true,
      panelClass: ['dialog'],
      data: { title: title, isAnimalCreation: isAnimalCreation, animal: animal }
    });
    dialogRefUser.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.animal = data.animal;
        if (data.isAnimalCreation) {
          this.animalService.add(this.animal).subscribe(
            (response) => {
              this.openSnackBar('Animal ' + this.animal.name + ' ajouté.', 'Fermer', 2000);
              this.getAnimalList();
            },
            (error: HttpErrorResponse) => {
              this.errorService.setError(error.statusText, error.message);
              this.router.navigate(['error']);
            }
          );
        }
        else {
          this.animalService.update(this.animal).subscribe(
            (response) => {
              this.openSnackBar('Animal ' + this.animal.name + ' mis à jour.', 'Fermer', 2000);
              this.getAnimalList();
            },
            (error: HttpErrorResponse) => {
              this.errorService.setError(error.statusText, error.message);
              this.router.navigate(['error']);
            }
          );
        }
      }
      else {
        console.log('animal vide');
      }
    });
  }

  openEditAnimalType(title: string, isAnimalTypeCreation: boolean, animalType: AnimalType): void {
    const dialogRefUser = this.dialogAnimalType.open(EditAnimalTypeComponent, {
      disableClose: true,
      panelClass: ['dialog'],
      data: { title: title, isAnimalTypeCreation: isAnimalTypeCreation, animalType: animalType }
    });
    dialogRefUser.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.animalType = data.animalType;

        if (data.isAnimalTypeCreation) {
          this.animalTypeService.add(this.animalType).subscribe(
            (response) => {
              this.openSnackBar('Type d\'animal ' + this.animalType.label + ' ajouté.', 'Fermer', 2000);
              this.getAnimalTypeList();
            },
            (error: HttpErrorResponse) => {
              this.errorService.setError(error.statusText, error.message);
              this.router.navigate(['error']);
            }
          );
        }
        else {
          this.animalTypeService.update(this.animalType).subscribe(
            (response) => {
              this.openSnackBar('Type d\'animal ' + this.animalType.label + ' mis à jour.', 'Fermer', 2000);
              this.getAnimalTypeList();
            },
            (error: HttpErrorResponse) => {
              this.errorService.setError(error.statusText, error.message);
              this.router.navigate(['error']);
            }
          );
        }
      }
      else {
        console.log('animal type vide');
      }
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

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(
      message,
      action,
      {
        duration: duration,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbar']
      }

    );
  }
}
