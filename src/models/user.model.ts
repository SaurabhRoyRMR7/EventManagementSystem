import { EventRegistration } from "./eventRegistration.model";
import { Organizer } from "./organizer.model";
import { UserRole } from "./userRole.model";

export class User {
    userId?: number;
    userRoleId?: number;
    name?: string;
    email?: string;
    password?: string;   
    googleId?: string;   
    createdAt?: Date;
    createdBy?: string;
    lastModifiedAt?: Date;
    lastModifiedBy?: string;
    eventRegistrations?: EventRegistration[] = [];   
    organizers?: Organizer[] = [];   
    userRole?: UserRole;   
    selectedRole?:number;
  
    constructor(
      userId?: number,
      userRoleId?: number,
      name?: string,
      email?: string,
      createdAt?: Date,
      createdBy?: string,
      lastModifiedAt?: Date,
      lastModifiedBy?: string,
      userRole?: UserRole,
      password?: string,
      googleId?: string,
      eventRegistrations?: EventRegistration[],
      organizers?: Organizer[]
    ) {
      this.userId = userId;
      this.userRoleId = userRoleId;
      this.name = name;
      this.email = email;
      this.createdAt = createdAt;
      this.createdBy = createdBy;
      this.lastModifiedAt = lastModifiedAt;
      this.lastModifiedBy = lastModifiedBy;
      this.userRole = userRole;
      this.password = password;
      this.googleId = googleId;
      this.eventRegistrations = eventRegistrations;
      this.organizers = organizers;
    }
  }
  
 
  
  