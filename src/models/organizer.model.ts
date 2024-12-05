export class Organizer {
    organizerId?: number;
    userId?: number;
    organizationName?: string;
    contactInfo?: string;  // This is optional
    createdAt?: Date;
    createdBy?: string;
    lastModifiedAt?: Date | null; // Nullable, since it can be null in the C# model
    lastModifiedBy?: string | null; // Nullable, as it can be null
    events?: Event[] = []; // Array of Event objects, related to this organizer
    user?: User; // User object associated with this organizer
  
    constructor(
      organizerId?: number,
      userId?: number,
      organizationName?: string,
      contactInfo?: string,
      createdAt?: Date,
      createdBy?: string,
      lastModifiedAt?: Date | null,
      lastModifiedBy?: string | null,
      events?: Event[],
      user?: User
    ) {
      this.organizerId = organizerId;
      this.userId = userId;
      this.organizationName = organizationName;
      this.contactInfo = contactInfo;
      this.createdAt = createdAt;
      this.createdBy = createdBy;
      this.lastModifiedAt = lastModifiedAt;
      this.lastModifiedBy = lastModifiedBy;
      this.events = events;
      this.user = user;
    }
  }
  
  // Assuming the related models are defined as follows:
  
  export class Event {
    // Define properties for Event model here
  }
  
  export class User {
    // Define properties for User model here
  }
  
  