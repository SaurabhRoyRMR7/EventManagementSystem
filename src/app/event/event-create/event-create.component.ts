import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';
import { RegistrationFormField } from '../../../models/registrationFormField.model';

import { ToastrService } from 'ngx-toastr'; 
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
// submitForm() {
// throw new Error('Method not implemented.');
// }
// addField() {
// throw new Error('Method not implemented.');
// }
// deleteField(_t114: number) {
// throw new Error('Method not implemented.');
// }

  event: Event;
  registrationFields: RegistrationFormField[] = []; 
  newFormField: RegistrationFormField = new RegistrationFormField();
  organizerId: number=0;
  userId: string = '';
  createForm:Boolean=false;
  userRole: string = '';
  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    this.event = new Event(); 
  }

  ngOnInit(): void {
     this.userId = localStorage.getItem('userId') || '';
     const userId = parseInt(this.userId , 10);
     this.userRole = localStorage.getItem('userRole') || '';
     if (!this.userRole || !this.userId) {
      this.router.navigate(['/login']);
    }

    this.userService.getOrganizerIdByUserId(userId).subscribe(
      (data) => {
        console.log(data,'data');
        this.organizerId = data;  // Store the OrganizerId
        console.log('OrganizerId:', this.organizerId);
      },
      (error) => {
        console.error('Error fetching OrganizerId:', error);
      }
    );
   
  }
  trackByIndex(index: number, item: any): number {
    return index; // Track by the index to preserve the state of the input fields
  }

  createEvent(): void {
    // Prepare the event data including the dynamic registration fields
    this.event.registrationFields = this.registrationFields;
    this.event.organizerId=this.organizerId;

    console.log(this.event,'event');

    // Call the service to create the event
    this.eventService.createEvent(this.event).subscribe(
      (createdEvent) => {
        this.toastr.success('Event created successfully');
        this.event = createdEvent; 
        window.alert('Event created successfully!');
        this.resetForm();

      // Redirect to the dashboard
      this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.toastr.error('Error creating event');
        console.error(error);
      }
    );
  }
  resetForm(): void {
    this.event = new Event(); 
    this.registrationFields = []; 
    this.newFormField = new RegistrationFormField(); 
  }

  addRegistrationField(): void {
    // Check if the field name is provided
    if (this.newFormField.fieldName) {
      // Add the field to the list
      this.registrationFields.push({ ...this.newFormField });
      this.newFormField = new RegistrationFormField(); 
      this.toastr.success('Registration field added successfully');
    } else {
      this.toastr.error('Please provide a valid field name');
    }
  }

  addFieldOption(): void {
   
    if (this.newFormField.fieldType === 'Dropdown') {
      this.newFormField.dropdownOptions.push('');
    } else if (this.newFormField.fieldType === 'Radio') {
      this.newFormField.radioOptions.push('');
    }
  }

  removeOption(index: number): void {
    // Remove option based on field type
    if (this.newFormField.fieldType === 'Dropdown') {
      if (this.newFormField.dropdownOptions) {
        this.newFormField.dropdownOptions.splice(index, 1);
        this.toastr.success('Option removed');
      }
    } else if (this.newFormField.fieldType === 'Radio') {
      if (this.newFormField.radioOptions) {
        this.newFormField.radioOptions.splice(index, 1);
        this.toastr.success('Option removed');
      }
    }
  }

  removeField(index: number): void {
    // Remove a registration field
    this.registrationFields.splice(index, 1);
    this.toastr.success('Registration field removed');
  }
  toggleForm() {
    this.createForm=!this.createForm;
    }
}
