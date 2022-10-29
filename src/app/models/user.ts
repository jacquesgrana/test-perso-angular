import { Animal } from "./animal";
import { Role } from "./role";

export class User {

  id!: number;
  userName!: string;
  token!: string;
  role!: Role;
  password!: string;
  animals!: Animal[];

  constructor(id: number, userName: string, token: string, role: Role, password: string, animals: Animal[]) { //, password: string
    this.id = id;
    this.userName = userName;
    this.token = token;
    this.role = role;
    this.password = password;
    this.animals = animals;
  }
}
