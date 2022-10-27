export class User {

  id!: number;
  username!: string;
  token!: string;
  role!: string;
  //password!: string;

  constructor(id: number, username: string, token: string, role: string) { //, password: string
    this.id = id;
    this.username = username;
    this.token = token;
    this.role = role;
    //this.password = password;
  }
}
