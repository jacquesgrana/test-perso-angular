import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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

  constructor(
    public roleService : RoleServiceService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: '', user: {id:0, userName:'', token:'', role:{id: 3, label :RoleEnum.ROLE_USER}, password:'', animals:[]}}
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  compareRoles(o1: Role, o2: Role): boolean {
    return o1.id === o2.id; //o1.label === o2.label &&
  }

}
