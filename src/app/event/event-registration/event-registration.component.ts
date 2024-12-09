import { Component } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { EventRegistrationDTO, EventRegistrationResponseDTO } from '../../../models/event-registrationDTO.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent {
  eventId: number = 0;
  userId: number = 1; 
  registrationFields: any[] = [];
  registrationResponses: EventRegistrationResponseDTO[] = [];
  userRole: string='';

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Get eventId from URL
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      console.log('Event ID:', this.eventId);
      this.getRegistrationFieldsForEvent(this.eventId);
    });
   
    const userId =localStorage.getItem('userId') || '';
    this.userId = parseInt(userId , 10);
    
    
    this.userRole = localStorage.getItem('userRole') || '';
    if (!this.userRole || !this.userId) {
     this.router.navigate(['/login']);
   }
  }
  generateUniqueCode(userId: number, eventId: number): string {
    // Get the current timestamp to make the code more unique
    const timestamp = new Date().toISOString();

    // Combine userId, eventId, and timestamp to create the unique code
    const uniqueCode = `${userId}-${eventId}-${timestamp}`;

    return uniqueCode;
  }

  // Fetch the registration fields for the event
  getRegistrationFieldsForEvent(eventId: number): void {
    // if(this.registrationFields.length!=0){
    //   this.toastr.error('Please fill in all the required fields.');
    //   }
    this.eventService.getRegistrationFields(eventId).subscribe(
      (fields: any) => {
        console.log(fields,'fields');
        this.registrationFields = fields.$values;
        this.registrationFields
      },
      (error) => {
        console.error('Error fetching registration fields', error);
      }
    );
  }

  // Handle the form submission
  registerForEvent(): void {
    if (this.registrationResponses.length === 0) {
      if(this.registrationFields.length!=0){
      this.toastr.error('Please fill in all the required fields.');
      
      }
      

      return;
    }
    
    if (!this.eventId || !this.userId) {
      this.toastr.error('Event ID or User ID is missing.');
      return;
  }
    const registrationData:EventRegistrationDTO = {
      EventId: this.eventId,
      UserId: this.userId,
      // RegistrationDate: new Date(),
      RegistrationCode:this.generateUniqueCode(this.userId,this.eventId),
      RegistrationResponses: this.registrationResponses.map(response => ({
        FieldId: response.FieldId,
        ResponseValue: response.ResponseValue
    }))
    };
    console.log(registrationData,'reg data');

    this.eventService.registerForEvent(registrationData).subscribe(
      (response) => {
        this.toastr.success('Successfully registered for the event!');
        this.router.navigate([`/dashboard`]);
      },
      (error) => {
        console.error('Error registering for event', error);
        this.toastr.error('Error during registration!');
      }
    );
  }

  // Collect the response for a field
  onFieldChange(fieldId: number, responseValue: string): void {
    const existingResponse = this.registrationResponses.find(r => r.FieldId === fieldId);

    if (existingResponse) {
        existingResponse.ResponseValue = responseValue;
    } else {
        this.registrationResponses.push({
            FieldId: fieldId,
            ResponseValue: responseValue
        });
    }
  }
}
