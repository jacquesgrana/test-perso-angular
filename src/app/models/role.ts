import { RoleEnum } from "./enums/roleEnum";

export class Role {

  id!: number;
  label!: RoleEnum

  constructor(id: number, label: RoleEnum) {
    this.id = id;
    this.label = label;
  }
}
