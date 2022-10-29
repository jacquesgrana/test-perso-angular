import { Injectable } from '@angular/core';
import { RoleEnum } from '../models/enums/roleEnum';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  roles: Role[] = [
    { id: 1, label: RoleEnum.ROLE_ADMIN },
    { id: 2, label: RoleEnum.ROLE_MANAGER },
    { id: 3, label: RoleEnum.ROLE_USER }
  ]

  constructor() { }

  toString(role: Role): string {
    let toReturn = '';
    switch (role.label) {
      case RoleEnum.ROLE_ADMIN:
        toReturn = 'Admin';
        break;
      case RoleEnum.ROLE_MANAGER:
        toReturn = 'Manager';
        break;
      case RoleEnum.ROLE_USER:
        toReturn = 'User';
        break;
    }
    return toReturn;
  }

  isEquals(roleUser : Role, roleSelect : Role): boolean {
    return roleUser.id === roleSelect.id; // && roleUser.label === roleSelect.label
  }
}
