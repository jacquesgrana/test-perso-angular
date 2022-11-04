import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleEnum } from 'src/app/models/enums/roleEnum';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { RoleServiceService } from 'src/app/services/role-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  user: User = new User(-1, '', '', new Role(-1, RoleEnum.ROLE_USER), '', []);

  hidePassword: boolean = true;
  isPasswordChanged: boolean = false;
  initialData: any;
  initialRole!: Role;
  initialPassword!: string;
  initialUsername!: string;
  initialUser!: User;

  //isUserCreation: boolean = true;
  //isNewPassword: boolean = true;


  constructor(
    public roleService: RoleServiceService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: '',
      isUserCreation: boolean,
      //isNewPassword: boolean,
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

  onNoClick(): void {
    this.initialData.user = this.initialUser;
    this.initialData.user.role = this.initialRole;
    this.initialData.user.password = this.initialPassword;
    this.initialData.user.userName = this.initialUsername;
    this.data = { ...this.initialData};
    //console.log('close edit user - data :', this.initialData);
    this.dialogRef.close();
  }

  /*
  onValidate(): void {

    if (this.initialPassword != this.data.user.password) {
      this.data.isNewPassword = true;
    }
    else {
      this.data.isNewPassword = false;
    }
  }*/

  ngOnInit(): void {
    this.initialData = { ...this.data};
    this.initialUser = this.initialData.user;
    this.initialRole = this.initialData.user.role;
    this.initialPassword = this.initialData.user.password;
    this.initialUsername = this.initialData.user.userName;
    //console.log('init edit user - data :', this.initialData);

  }

  compareRoles(o1: Role, o2: Role): boolean {
    return o1.id === o2.id; //o1.label === o2.label &&
  }

}
