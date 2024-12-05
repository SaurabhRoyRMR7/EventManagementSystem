import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Event } from '../models/event.model';
import { EventRegistrationFormField } from '../models/event-registration-field.model';
import { EventRegistrationDTO } from '../models/event-registrationDTO.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
    private apiURLField=`${environment.apiUrl}/EventRegistrationForm`;
  private apiUrl = `${environment.apiUrl}/Event`; 

  private apiURLRegister=`${environment.apiUrl}/EventRegistration`;

  constructor(private http: HttpClient) {}

  // Create a new event
  createEvent(event: Event): Observable<Event> {
    console.log('Event Creation',this.http.post<Event>(`${this.apiUrl}`, event))
    return this.http.post<Event>(`${this.apiUrl}`, event);
  }

//   getEvents(location: string): Observable<Event[]> {
//     return this.http.get<any[]>(`${this.apiUrl}?location=${location}`);
//   }
  getEvents(): Observable<Event[]> {
    return this.http.get<any[]>(`${this.apiUrl}/events`);
  }
  togglePublishEvent(eventId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${eventId}/publish`, {});
  }

  // Get event by ID
  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${eventId}`);
  }
  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteEvent/${eventId}`);
  }

  // Create custom registration form field
  // createRegistrationFormField(formField: EventRegistrationFormField): Observable<EventRegistrationFormField> {
  //   return this.http.post<EventRegistrationFormField>(`${this.apiUrl}/registration-forms-fields`, formField);
  // }

  // Get registration fields for a specific event
//   getRegistrationFields(eventId: number): Observable<EventRegistrationFormField[]> {
//     return this.http.get<EventRegistrationFormField[]>(`${this.apiUrl}/${eventId}/registration-forms-fields`);
//   }

//   registerForEvent(data: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, data);
//   }

  // getEventParticipants(eventId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/${eventId}/participants`);
  // }

  // Remove a participant from an event
  // removeParticipant(eventId: number, registrationId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${eventId}/participants/${registrationId}`);
  // }
  getEventsByOrganizer(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/organizer/${userId}/events`);
  }
 
  
  getUpcomingEvents(): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/upcoming`);
  }

  // Method to fetch registered events for a participant
  getRegisteredEvents(userId: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/GetRegisteredEvents/${userId}`);
  }
  // Unregister from an event
  unregisterFromEvent(registrationDTO:EventRegistrationDTO ): Observable<any> {
    // { userId: number, eventId: number }
    return this.http.post<any>(`${this.apiUrl}/${registrationDTO.EventId}/unregister`, registrationDTO);
  }
  getRegistrationFields(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURLField}/${eventId}`);
  }

  // Register for the event and submit the responses
//   registerForEvent(registrationData: any): Observable<any> {
//     return this.http.post<any>(`${this.apiURLRegister}/${registrationData.EventId}`, registrationData);
//   }
  registerForEvent(registrationData: EventRegistrationDTO): Observable<any> {
    console.log(registrationData.EventId,'idd');
    
    return this.http.post<EventRegistrationDTO>(`${this.apiUrl}/${registrationData.EventId}/register`, registrationData);
  }
  checkUserRegistration(eventId: number, userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${eventId}/is-registered/${userId}`);
  }
  getEventParticipants(eventId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/participants/${eventId}`);
  }
}
