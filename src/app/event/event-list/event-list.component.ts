import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';
import { Router } from '@angular/router';
import { EventRegistrationDTO } from '../../../models/event-registrationDTO.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  @Input() events: Event[] = [];
  @Input() userRole: string = '';
  @Input() viewUpcomingEventFlag: Boolean = false;
  @Input() viewRegisteredEventFlag: Boolean = false;
  @Input() clickedButton: string = '';
  @Input() activeButtons: Set<string> = new Set();
  selectedEventParticipants: any[] = [];
  viewParticipants: boolean = false;
  // events: Event[] = [];
  location: string = '';
  eventType: string = '';

  constructor(private eventService: EventService, private router : Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    
  }
  toggleButtonClick(buttonId: string) {
    if (this.activeButtons.has(buttonId)) {
      
      this.activeButtons.delete(buttonId);
    } else {
      
      this.activeButtons.add(buttonId);
    }
  }
  getActionButton(event: any): string {
    if (this.userRole === 'Organizer' || this.userRole === 'Admin') {
      return event.isPublished ? 'Unpublish' : 'Publish';
    } else if (this.userRole === 'Participant') {
      return this.isEventRegistered(event) ? 'Unregister' : 'Register';
    }
    return '';
  }
  isEventRegistered(event: any): boolean {
    return event.isRegistered;
  }
  registerForEvent(eventId: number): void {
   
    this.router.navigate(['/register-event', eventId]);
  }
  unregisterFromEvent(eventId: number): void {
    const userId = parseInt(localStorage.getItem('userId') || '', 10);
    if (confirm('Are you sure you want to unregister from this event?')) {
      const registrationDTO:EventRegistrationDTO = {
        UserId: userId,
        EventId: eventId  // Send both the eventId and userId to the backend
      };

      this.eventService.unregisterFromEvent(registrationDTO).subscribe(
        () => {
          // Refresh the list of upcoming and registered events after unregistration
          this.loadUpcomingEvents(userId);
          this.loadRegisteredEvents(userId);

          this.toastr.success('You have successfully unregistered from the event.');
        },
        (error) => {
          console.error('Error unregistering from event', error);
          this.toastr.error('An error occurred while unregistering from the event.');
        }
      );
    }
  }
  loadUpcomingEvents(userId:number): void {
  
    this.eventService.getUpcomingEvents().subscribe(
      (data: any) => {
        this.events = data.$values;

        
        this.events.forEach(event => {
          
          event.isRegistered = false;  
          
          this.eventService.checkUserRegistration(event.eventId, userId).subscribe(
            (response: any) => {
              console.log(response,'reg status',response.isRegistered)
              event.isRegistered = response.isRegistered;
              
            },
            (error) => {
              console.error('Error checking registration status', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error loading upcoming events', error);
        // this.toastr.error('An error occurred while loading upcoming events.');
      }
    );
  }
  loadRegisteredEvents(userId: number): void {
    this.eventService.getRegisteredEvents(userId).subscribe(
      (data: any) => {
        this.events = data.$values;
        this.events.forEach(event => {
          
          event.isRegistered = false;  
          
          this.eventService.checkUserRegistration(event.eventId, userId).subscribe(
            (response: any) => {
              console.log(response,'reg status',response.isRegistered)
              event.isRegistered = response.isRegistered;
              
            },
            (error) => {
              console.error('Error checking registration status', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error loading registered events', error);
      }
    );
  }
  togglePublish(eventId: number): void {
    this.eventService.togglePublishEvent(eventId).subscribe(
      (data: any) => {
        const updatedEvent = this.events.find((event) => event.eventId === eventId);
        if (updatedEvent) {
          updatedEvent.isPublished = data.isPublished;
        }
      },
      (error) => {
        console.error('Error updating event publish status:', error);
      }
    );
  }
  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe(
        (response) => {
          this.toastr.success('Event deleted successfully!');
          
        },
        (error) => {
          console.error('Error deleting event', error);
          this.toastr.error('Error deleting event.');
        }
      );
    }
  }


  viewEventParticipants(eventId: number): void {
    this.viewParticipants =  !this.viewParticipants;
    this.eventService.getEventParticipants(eventId).subscribe(
      (participants) => {
        this.selectedEventParticipants = participants.$values;
       
        console.log(this.selectedEventParticipants,'participants');
        
      },
      (error) => {
        console.error('Error fetching participants:', error);
      }
    );
  }
}
