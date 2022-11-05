import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal';
import { AnimalType } from 'src/app/models/animal-type';
import { Genre } from 'src/app/models/enums/genre';
import { AnimalTypeServiceService } from 'src/app/services/animal-type-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorServiceService } from 'src/app/services/error-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.scss']
})
export class EditAnimalComponent implements OnInit {

  initialData: any;
  initialAnimal!: Animal;

  initialAnimalType!: AnimalType;
  initialName!: string;
  initialComment!: string;
  initialGenre!: Genre;
  initialBirth!: Date;

  animalTypeList: AnimalType[] = [];

  genreList: Genre[] = [Genre.MALE, Genre.FEMALE];

  constructor(
    public animalTypeService : AnimalTypeServiceService,
    public dialogRef: MatDialogRef<EditAnimalComponent>,
    private errorService: ErrorServiceService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: '',
      isAnimalCreation: boolean,
      animal: {
        id: -1,
        animalType: {
          id: 1
          label: 'Chat'
        },
        name: '',
        comment: '',
        genre: Genre.MALE,
        birth: Date
      }
    }
  ) { }

  ngOnInit(): void {
    this.initialData = { ...this.data};
    this.initialAnimal = this.initialData.animal;
    this.initialAnimalType = this.initialData.animal.animalType;
    this.initialName = this.initialData.animal.name;
    this.initialComment = this.initialData.animal.comment;
    this.initialGenre = this.initialData.animal.genre;
    this.initialBirth = this.initialData.animal.birth;
    this.getAnimalTypeList();
  }

  onNoClick(): void {
    this.initialData.animal = this.initialAnimal;
    this.initialData.animal.animalType = this.initialAnimalType;
    this.initialData.animal.name = this.initialName;
    this.initialData.animal.comment = this.initialComment;
    this.initialData.animal.genre = this.initialGenre;
    this.initialData.animal.birth = this.initialBirth;
    this.data = { ...this.initialData};
    this.dialogRef.close();
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

  compareAnimalTypes(o1: AnimalType, o2: AnimalType): boolean {
    return o1.id === o2.id;
  }

  compareGenres(o1: Genre, o2: Genre): boolean {
    return o1.valueOf() === o2.valueOf();
  }

}
