import { AnimalType } from "./animal-type";
import { Genre } from "./enums/genre";

export class Animal {

  id!: number;
  animalType!: AnimalType;
  name!: string;
  comment!: string;
  genre!: Genre;
  birth!: Date;

  constructor(
    id: number,
    animalType: AnimalType,
    name: string,
    comment: string,
    genre: Genre,
    birth: Date
  ) {
    this.id = id;
    this.animalType = animalType;
    this.name = name;
    this.comment = comment;
    this.genre = genre;
    this.birth = birth;
  }
}
