import { User } from "./user.model";

export class UserRole {
    userRoleId?: number;
    roleName?: string;
    users?: User[] = []; // Array of User objects related to this role
  
    constructor(
      userRoleId?: number,
      roleName?: string,
      users?: User[]
    ) {
      this.userRoleId = userRoleId;
      this.roleName = roleName;
      this.users = users;
    }
  }