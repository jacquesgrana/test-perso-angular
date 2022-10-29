import { Role } from "./role";

export class User {

  id!: number;
  userName!: string;
  token!: string;
  role!: Role;
  password!: string;

  constructor(id: number, userName: string, token: string, role: Role, password: string) { //, password: string
    this.id = id;
    this.userName = userName;
    this.token = token;
    this.role = role;
    this.password = password;
  }
}
