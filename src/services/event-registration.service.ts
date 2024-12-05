import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { EventRegistrationDTO } from '../models/event-registrationDTO.model';


@Injectable({
  providedIn: 'root'
})
export class EventRegistrationService {

  private apiUrl = `${environment.apiUrl}/api/event-registrations`;

  constructor(private http: HttpClient) { }

  // Register a user for an event
  registerForEvent(registration: EventRegistrationDTO): Observable<EventRegistrationDTO> {
    return this.http.post<EventRegistrationDTO>(this.apiUrl, registration);
  }

  // Get a specific event registration
  getEventRegistration(id: number): Observable<EventRegistrationDTO> {
    return this.http.get<EventRegistrationDTO>(`${this.apiUrl}/${id}`);
  }
}
