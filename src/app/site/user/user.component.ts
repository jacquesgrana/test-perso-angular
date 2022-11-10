import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/animal';
import { AnimalType } from 'src/app/models/animal-type';
import { Genre } from 'src/app/models/enums/genre';
import { AnimalServiceService } from 'src/app/services/animal-service.service';
import { ErrorServiceService } from 'src/app/services/error-service.service';
import { LinkUserAnimalService } from 'src/app/services/link-user-animal.service';
import { UserService } from 'src/app/services/user-service.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { EditAnimalComponent } from '../shared/edit-animal/edit-animal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  animalListFromUser!: Animal[];
  animalListOrphans!: Animal[];

  animal !: Animal;

  dialogRef!: MatDialogRef<ConfirmationDialogComponent>;

  displayedAnimalsColumns: string[] = ['name', 'type', 'genre', 'birth', 'actions'];

  @ViewChild(MatTable) tableUser!: MatTable<Animal>;
  @ViewChild(MatTable) tableOrphans!: MatTable<Animal>;

  constructor(
    public userService: UserService,
    private animalService: AnimalServiceService,
    private linkUserAnimalService: LinkUserAnimalService,
    private errorService: ErrorServiceService,
    public dialogAnimal: MatDialog,
    private snackBar: MatSnackBar,
    public dialogConfirm: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAnimalListFromUser();
    this.getAnimalListOrphans();
  }

  getAnimalListFromUser(): void {
    if (this.userService.user.animals.length > 0) {
      this.animalListFromUser = this.userService.user.animals;
      //console.log('module user : liste des animaux possédés :', this.animalListFromUser);
    }
  }

  getAnimalListOrphans(): void {
    this.animalService.getOrphansAnimals().subscribe(
      (response: Animal[]) => {
        this.animalListOrphans = response as Animal[];
        //console.log('module user : liste des animaux orphelins :', this.animalListOrphans);
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  addAnimal(): void {
    console.log('module user : ajouter animal');
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

  editAnimal(animal: Animal): void {
    console.log('module user : éditer animal :', animal.name);
    this.openEditAnimal('Editer un animal', false, animal);
  }

  deleteAnimal(animal: Animal): void {
    console.log('module user : supprimer animal :', animal.name);
    this.dialogRef = this.dialogConfirm.open(ConfirmationDialogComponent, {
      disableClose: true
    });
    this.dialogRef.componentInstance.confirmMessage = 'Voulez-vous vraiment effacer l\'animal ' + animal.name + '?';

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.animalService.delete(animal.id).subscribe(
          (response) => {
            //console.log('delete animal request ok');
            this.openSnackBar('Animal ' + animal.name + ' supprimé.', 'Fermer', 2000);
            this.getAnimalListFromUser();
            this.getAnimalListOrphans();
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

  unlinkAnimal(animal: Animal): void {
    console.log('module user : unlink animal :', animal.name);
    this.linkUserAnimalService.unlinkAnimalToUser(this.userService.user.id, animal.id).subscribe(
      data => {
        let tempData = [...this.animalListFromUser];
        tempData.push(animal);
        this.animalListFromUser = tempData;
        this.tableUser.renderRows();

        this.animalListOrphans = this.animalListOrphans.filter(a => a.id !== animal.id);
        this.tableOrphans.renderRows();

        //this.openSnackBar('Animal ' + this.animal.name + ' mis à jour.', 'Fermer', 2000);
        this.getAnimalListFromUser();
        this.getAnimalListOrphans();
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );
  }

  linkAnimal(animal: Animal): void {
    console.log('module user : link animal :', animal);
    // TODO récupérer l'id de l'animal
    this.animalService.getOrphansAnimals().subscribe(
      (response: Animal[]) => {
        this.animalListOrphans = response as Animal[];
        let idAnimal: number = -1;
        console.log('new animal :', animal);
        console.log('orphans animal list :', this.animalListOrphans);


        if (animal.id === undefined || animal.id === -1) {

          for (let a of this.animalListOrphans) {
            if (
              JSON.stringify(a.animalType) === JSON.stringify(animal.animalType)
              && new Date(a.birth).getTime() === new Date(animal.birth).getTime()
              && a.comment.match(animal.comment) !== null
              && JSON.stringify(a.genre) === JSON.stringify(animal.genre)
              //&& a.genre === animal.genre
              && a.name.match(animal.name) !== null
            ) {
              idAnimal = a.id;
            }
          }
          /*
                    idAnimal = this.animalListOrphans.filter(a => {
                      JSON.stringify(a.animalType)  === JSON.stringify(animal.animalType)
                        && new Date(a.birth).getTime() === new Date(animal.birth).getTime()
                        && a.comment.match(animal.comment) !== null
                        && JSON.stringify(a.genre)  === JSON.stringify(animal.genre)
                        //&& a.genre === animal.genre
                        && a.name.match(animal.name) !== null
                    }).map(a => a.id)[0];

          */

          console.log('new animal : id :', idAnimal);
          this.animal.id = idAnimal;
        }
        else {
          idAnimal = animal.id;
        }

        //console.log('module user : liste des animaux orphelins :', this.animalListOrphans);

        this.linkUserAnimalService.linkAnimalToUser(this.userService.user.id, idAnimal).subscribe(
          data => {

            let tempData = [...this.animalListFromUser];
            tempData.push(animal);
            this.animalListFromUser = tempData;
            this.tableUser.renderRows();

            this.animalListOrphans = this.animalListOrphans.filter(a => a.id !== animal.id);
            this.tableOrphans.renderRows();

            //this.openSnackBar('Animal ' + this.animal.name + ' ajouté.', 'Fermer', 2000);
            //this.getAnimalListFromUser();
            //this.getAnimalListOrphans();
          },
          (error: HttpErrorResponse) => {
            this.errorService.setError(error.statusText, error.message);
            this.router.navigate(['error']);
          }
        );
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );

    /*
    this.linkUserAnimalService.linkAnimalToUser(this.userService.user.id, animal.id).subscribe(
      data => {

        let tempData = [...this.animalListFromUser];
        tempData.push(animal);
        this.animalListFromUser = tempData;
        this.tableUser.renderRows();

        this.animalListOrphans = this.animalListOrphans.filter(a => a.id !== animal.id);
        this.tableOrphans.renderRows();

        //this.openSnackBar('Animal ' + this.animal.name + ' ajouté.', 'Fermer', 2000);
        this.getAnimalListFromUser();
        this.getAnimalListOrphans();
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(error.statusText, error.message);
        this.router.navigate(['error']);
      }
    );*/
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
              // TODO lier animal a user
              this.linkAnimal(animal);

              this.openSnackBar('Animal ' + this.animal.name + ' ajouté.', 'Fermer', 2000);
              //this.getAnimalListFromUser();
              //this.getAnimalListOrphans();
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
              this.getAnimalListFromUser();
              this.getAnimalListOrphans();

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
