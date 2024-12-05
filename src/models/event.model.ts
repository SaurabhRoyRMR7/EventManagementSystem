import { RegistrationFormField } from './registrationFormField.model'; 

export class Event {
  eventId: number;
  organizerId: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  price: number;
  isPublished: boolean;
  createdAt: Date;
  createdBy: string;
  lastModifiedAt: Date;
  lastModifiedBy: string;
  isRegistered?:boolean;
  
  registrationFields: RegistrationFormField[];  // Add this field for dynamic form fields

  constructor() {
    this.eventId = 0;
    this.organizerId = 0;
    this.title = '';
    this.description = '';
    this.startDate = new Date();
    this.endDate = new Date();
    this.location = '';
    this.price = 0;
    this.isPublished = false;
    this.createdAt = new Date();
    this.createdBy = '';
    this.lastModifiedAt = new Date();
    this.lastModifiedBy = '';
    this.registrationFields = [];  
    this.isRegistered=false;
  }
}
