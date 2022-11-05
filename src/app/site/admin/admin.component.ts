import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { User } from 'src/app/models/user';
import { AnimalType } from 'src/app/models/animal-type';
import { AnimalServiceService } from 'src/app/services/animal-service.service';
import { UserService } from 'src/app/services/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './../shared/edit-user/edit-user.component';
import { RoleEnum } from 'src/app/models/enums/roleEnum';
import { Role } from 'src/app/models/role';
import { ErrorServiceService } from 'src/app/services/error-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AnimalTypeServiceService } from 'src/app/services/animal-type-service.service';
import { EditAnimalTypeComponent } from '../shared/edit-animal-type/edit-animal-type.component';
import { EditAnimalComponent } from '../shared/edit-animal/edit-animal.component';
import { Genre } from 'src/app/models/enums/genre';
import { ManageAnimalLinksComponent } from '../shared/manage-animal-links/manage-animal-links.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  userList !: User[]; // TODO changer type : User ou UserDto (à créer)
  animalList !: Animal[];
  animalTypeList !: AnimalType[];
  displayedColumns: string[] = ['id', 'name', 'role', 'nb-animals', 'actions']; //, 'nb-animals'
  displayedAnimalsColumns: string[] = ['id', 'name', 'type', 'genre', 'birth', 'actions'];
  displayedAnimalTypesColumns: string[] = ['id', 'label', 'actions'];
  //isEditUserDivOpen: boolean = false;


  // TODO pour tester :
  //name!: string;
  color!: string;

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
    public dialogUser: MatDialog
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
    this.animalService.getAll().subscribe( // .getAnimalList()
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
        //console.log('animal type list :', this.animalTypeList);
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  addUser(): void {
    console.log('add user');
    //this.isEditUserDivOpen = !this.isEditUserDivOpen;
    const user = new User(-1, '', '', new Role(3, RoleEnum.ROLE_USER), '', []);
    this.openEditUser('Ajouter User', true, user);
  }

  editUser(user: User) {
    console.log('edit user : ' + user.userName);
    //this.isEditUserDivOpen = !this.isEditUserDivOpen;
    this.openEditUser('Editer User', false, user);
  }

  deleteUser(user: User) {
    // TODO ajouter ouverture alert pour demander confirmation
    console.log('delete user : ' + user.userName);
    this.userService.deleteUser(user.id).subscribe(
      (response) => {
        // TODO ajouter ouverture alert pour avertir que tout est ok
        console.log('delete request ok');
        this.getUserList();
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  addAnimal(): void {
    console.log('add animal');
    const animalType: AnimalType = new AnimalType(1,'Chat');
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
    console.log('edit animal : ' + animal.name);
    this.openEditAnimal('Editer un animal', false, animal);
  }

  deleteAnimal(animal: Animal) {
    console.log('delete animal : ' + animal.name);
    this.animalService.delete(animal.id).subscribe(
      (response) => {
        // TODO ajouter ouverture alert pour avertir que tout est ok
        console.log('delete animal request ok');
        this.getAnimalList();
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  addAnimalType(): void {
    console.log('add animal type');
    const animalType = new AnimalType(-1, '');
    this.openEditAnimalType('Ajouter un Type d\'animaux', true, animalType);
  }

  editAnimalType(animalType: AnimalType) {
    console.log('edit animal type : ' + animalType.label);
    this.openEditAnimalType('Editer un Type d\'animaux', false, animalType);
  }

  deleteAnimalType(animalType: AnimalType) {
    console.log('delete animal type : ' + animalType.label);
    this.animalTypeService.delete(animalType.id).subscribe(
      (response) => {
        // TODO ajouter ouverture alert pour avertir que tout est ok
        console.log('delete animal type request ok');
        this.getAnimalTypeList();
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  /**
   * TODO enlever booleen isNewPassword
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
      // TODO modifier
      if (data != undefined) {
        this.user = data.user;
        //console.log('user modifié :', user);
        //console.log('isUserCreation :', data.isUserCreation);
        //console.log('isNewPassword :', data.isNewPassword);

        if(data.isUserCreation) {
          this.userService.createUser(this.user).subscribe(
            (response) => {
              // TODO ajouter ouverture alert pour avertir que tout est ok
              console.log('post request ok');
              this.getUserList();
            }, // TODO améliorer affichage de l'erreur
            (error: HttpErrorResponse) => {
              this.errorService.setError(error.statusText, error.message);
              this.router.navigate(['error']);
            }
          );
        }
        else {
          this.userService.updateUser(this.user).subscribe(
            (response) => {
              // TODO ajouter ouverture alert pour avertir que tout est ok
              console.log('put request ok');
              this.getUserList();
            }, // TODO améliorer affichage de l'erreur
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

  openEditAnimal(title: string, isAnimalCreation : boolean, animal: Animal): void {
    const dialogRefUser = this.dialogUser.open(EditAnimalComponent, {
      disableClose: true,
      panelClass: ['dialog'],
      data: { title: title, isAnimalCreation: isAnimalCreation, animal: animal }
    });
    dialogRefUser.afterClosed().subscribe(data => {
      if (data != undefined) {
        this.animal = data.animal;
        if(data.isAnimalCreation) {
          this.animalService.add(this.animal).subscribe(
            (response) => {
              // TODO ajouter ouverture alert pour avertir que tout est ok
              console.log('post request animal ok');
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
              // TODO ajouter ouverture alert pour avertir que tout est ok
              console.log('put request animal ok');
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

  openEditAnimalType(title: string, isAnimalTypeCreation : boolean, animalType: AnimalType): void {
    const dialogRefUser = this.dialogUser.open(EditAnimalTypeComponent, {
      disableClose: true,
      panelClass: ['dialog'],
      data: { title: title, isAnimalTypeCreation: isAnimalTypeCreation, animalType: animalType }
    });
    dialogRefUser.afterClosed().subscribe(data => {
      // TODO modifier
      if (data != undefined) {
        this.animalType = data.animalType;
        //console.log('user modifié :', user);
        //console.log('isUserCreation :', data.isUserCreation);
        //console.log('isNewPassword :', data.isNewPassword);

        if(data.isAnimalTypeCreation) {
          this.animalTypeService.add(this.animalType).subscribe(
            (response) => {
              // TODO ajouter ouverture alert pour avertir que tout est ok
              this.getAnimalTypeList();
            }, // TODO améliorer affichage de l'erreur
            (error: HttpErrorResponse) => {
              this.errorService.setError(error.statusText, error.message);
              this.router.navigate(['error']);
            }
          );
        }
        else {
          this.animalTypeService.update(this.animalType).subscribe(
            (response) => {
              // TODO ajouter ouverture alert pour avertir que tout est ok
              console.log('put request animal type ok');
              this.getAnimalTypeList();
            }, // TODO améliorer affichage de l'erreur
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
    // TODO ouvre une modal avec deux liste d'animaux : ceux possédés par l'user et ceux sans maitre
    // avec possibilité d'ajouter/enlever des animaux a l'user
    const dialogRefUser = this.dialogUser.open(ManageAnimalLinksComponent, {
      disableClose: true,
      panelClass: ['dialog'],
      data: {user: user}
    });
    dialogRefUser.afterClosed().subscribe(data => {
      // TODO modifier
      this.getUserList();
    }
    );
  }
}
