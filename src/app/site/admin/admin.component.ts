import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { User } from 'src/app/models/user'
import { AnimalServiceService } from 'src/app/services/animal-service.service';
import { UserService } from 'src/app/services/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './../shared/edit-user/edit-user.component';
import { RoleEnum } from 'src/app/models/enums/roleEnum';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  userList !: User[]; // TODO changer type : User ou UserDto (à créer)
  animalList !: Animal[];
  displayedColumns: string[] = ['id', 'name', 'role', 'nb-animals', 'actions']; //, 'nb-animals'
  displayedAnimalsColumns: string[] = ['id', 'name', 'type', 'genre', 'birth', 'actions'];
  //isEditUserDivOpen: boolean = false;


  // TODO pour tester :
  //name!: string;
  color!: string;

  user!: User;
  //animal !: Animal;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private animalService: AnimalServiceService,
    public dialogUser: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getUserList();
    this.getAnimalList();
  }

  getUserList(): void {
    this.userService.getUserList().subscribe(
      data => {
        this.userList = data;
      }
    );
  }

  getAnimalList(): void {
    this.animalService.getAll().subscribe( // .getAnimalList()
      data => {
        this.animalList = data;
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
    console.log('delete user : ' + user.userName);
  }

  addAnimal(): void {
    console.log('add animal');
  }

  editAnimal(animal: Animal) {
    console.log('edit animal : ' + animal.name);
  }

  deleteAnimal(animal: Animal) {
    console.log('delete animal : ' + animal.name);
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
          this.userService.createUser(user).subscribe(
            (response) => {
              console.log('post request ok');
              this.getUserList();
            }
          );
        }
        else {
          this.userService.updateUser(user).subscribe(
            (response) => {
              console.log('put request ok');
              this.getUserList();
            }
          );
        }
      }
      else {
        console.log('user vide');
      }
    });
  }

}
