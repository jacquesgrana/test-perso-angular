import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AnimalType } from 'src/app/models/animal-type';
import { RoleServiceService } from 'src/app/services/role-service.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-edit-animal-type',
  templateUrl: './edit-animal-type.component.html',
  styleUrls: ['./edit-animal-type.component.scss']
})
export class EditAnimalTypeComponent implements OnInit {

  //animalType: AnimalType = new AnimalType(-1, '');

  initialData: any;
  initialLabel!: string;
  initialAnimalType!: AnimalType;

  constructor(
    public roleService: RoleServiceService,
    public userService : UserService,
    public dialogRef: MatDialogRef<EditAnimalTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: '',
      isAnimalTypeCreation: boolean,
      //isNewPassword: boolean,
      animalType: {
        id: 0,
        label: ''
      }
    }
  ) { }

  onNoClick(): void {
    this.initialData.animalType = this.initialAnimalType;
    this.initialData.animalType.label = this.initialLabel;
    this.data = { ...this.initialData};
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.initialData = { ...this.data};
    this.initialAnimalType = this.initialData.animalType;
    this.initialLabel = this.initialData.animalType.label;
  }

}
