import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { EventRegistrationDTO } from '../../../models/event-registrationDTO.model';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Event } from "../../../models/event.model"
import { User } from '../../../models/user.model';
import { UserRole } from '../../../models/userRole.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  userRole: string = '';
  userId: string = '';
  user: User = {};
  users: User[] = [];
  events: Event[] = [];
  roles: UserRole[] = [];
  viewEventFlag: Boolean = false;
  viewRegisteredEventFlag: Boolean = false;
  viewUpcomingEventFlag: Boolean = false;
  manageUserFlag:Boolean=false;
  manageEventFlag:Boolean=false;
  upcomingEvents: Event[] = [];
  registeredEvents: Event[] = [];
  clickedButton: string = '';
  activeButtons: Set<string> = new Set<string>();


  constructor(private router: Router, private eventService: EventService, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // Retrieve user role and ID from localStorage
    this.userRole = localStorage.getItem('userRole') || '';
    this.userId = localStorage.getItem('userId') || '';
    const userId = parseInt(this.userId, 10);
    // Redirect to login if no userRole or userId is found
    if (!this.userRole || !this.userId) {
      this.router.navigate(['/login']);
    }

    if (this.userRole == 'Admin') {
      this.getUsers();

    }
    this.loadUpcomingEvents(userId);
    this.loadRegisteredEvents(userId);
    this.fetchUserProfile(userId);
    this.getRoles();
  }
  toggleButtonClick(buttonId: string) {
    if (this.activeButtons.has(buttonId)) {
      // If the button is already active, remove it from the set
      this.activeButtons.delete(buttonId);
    } else {
      // Otherwise, add it to the active set
      this.activeButtons.add(buttonId);
    }
  }
  getRoles(): void {
    // You can either hardcode this or fetch it from an API if you have the roles stored in the database.
    this.roles = [
      { userRoleId: 7, roleName: 'Participant' },
      { userRoleId: 8, roleName: 'Organizer' },
      // { id: 9, name: 'Admin' },
    ];
  }
  getFirstLetterOfName(): string {
    if (this.user && this.user.name) {
      return this.user.name.charAt(0).toUpperCase();
    }
    return '';
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response.$values;
        this.users.forEach(user => {
          
          user.selectedRole = user.userRoleId;  
        });
      },
      (error) => {
        console.error('Error fetching users', error);
        this.toastr.error('Error fetching users.');
      }
    );
  }

  fetchUserProfile(userId: number): void {
    this.userService.getUserProfile(userId).subscribe(
      (data) => {
        this.user = data;
        console.log(data, 'user')
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  fetchOrganizerEvent(userId: number) {
    this.eventService.getEventsByOrganizer(userId).subscribe(
      (data: any) => {

        if (data && Array.isArray(data.$values)) {
          this.events = data.$values;  // Extract the events from '$values'
        } else {
          console.error('Invalid response format', data);
          this.events = [];  // Set events to empty if response is invalid
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
        this.events = [];  // Set events to empty in case of error
      },

    );
  }
  createEvent(): void {
   
    this.router.navigate(['/create-event']);
  }

  viewMyEvents(): void {
    console.log("view");
    this.userId = localStorage.getItem('userId') || '';
    const userId = parseInt(this.userId, 10);
    this.fetchOrganizerEvent(userId);
    // Navigate to the My Events page where organizers can see their events
    this.viewEventFlag = !this.viewEventFlag;
  }
  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe(
        (response) => {
          this.toastr.success('Event deleted successfully!');
          this.loadEvents(); 
        },
        (error) => {
          alert(error.error)
          console.error('Error deleting event', error);
          this.toastr.error('Error deleting event.');
        }
      );
    }
  }
  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (data: any) => {
        this.events = data.$values;
      },
      (error) => {
        console.error('Error fetching events', error);
        this.toastr.error('Error fetching events.');
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
  loadUpcomingEvents(userId:number): void {
  
    this.eventService.getUpcomingEvents().subscribe(
      (data: any) => {
        this.upcomingEvents = data.$values;

        
        this.upcomingEvents.forEach(event => {
          
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
        this.toastr.error('An error occurred while loading upcoming events.');
      }
    );
  }

  // Load the participant's registered events
  loadRegisteredEvents(userId: number): void {
    this.eventService.getRegisteredEvents(userId).subscribe(
      (data: any) => {
        this.registeredEvents = data.$values;
        this.registeredEvents.forEach(event => {
          
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
 
  // Register for an event
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

  myRegistrations(): void {
    this.viewRegisteredEventFlag = !this.viewRegisteredEventFlag;
   
  }

  manageUsers(): void {
    this.manageUserFlag=!this.manageUserFlag;
  }

  manageEvents(): void {
    // Navigate to the Event Management page
   this.manageEventFlag=!this.manageEventFlag;
   this.loadEvents();
  }
  viewUpcomingEvents() {
    const userId = parseInt(localStorage.getItem('userId') || '', 10);
    this.loadUpcomingEvents(userId);
    this.viewUpcomingEventFlag = !this.viewUpcomingEventFlag;
  }
  viewRegisteredEvents() {
    const userId = parseInt(localStorage.getItem('userId') || '', 10);
    this.loadRegisteredEvents(userId);
    this.viewRegisteredEventFlag = !this.viewRegisteredEventFlag;
  }
  updateRole(userId: any, userRoleId: any): void {
    this.userService.updateUserRole(userId, userRoleId).subscribe(
      (response) => {
        console.log()
        this.toastr.success('User role updated successfully!');
        this.getUsers(); 
      },
      (error) => {
        console.error('Error updating user role', error);
        this.toastr.error('Error updating user role.');
      }
    );
  }
  deleteUser(userId: any): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
         
          this.toastr.success('User deleted successfully!');
          this.getUsers(); 
        },
        (error) => {
          alert(error.error);
          console.error('Error deleting user', error);
          this.toastr.error('Error deleting user.');
        }
      );
    }
  }

}
