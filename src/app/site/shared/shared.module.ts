import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditAnimalTypeComponent } from './edit-animal-type/edit-animal-type.component';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAnimalComponent } from './edit-animal/edit-animal.component';
import { ManageAnimalLinksComponent } from './manage-animal-links/manage-animal-links.component';



@NgModule({
  declarations: [
    EditUserComponent,
    EditAnimalTypeComponent,
    EditAnimalComponent,
    ManageAnimalLinksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    EditUserComponent,
    EditAnimalTypeComponent
  ]
})
export class SharedModule { }
