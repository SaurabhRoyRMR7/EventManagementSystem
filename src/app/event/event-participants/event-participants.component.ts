
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-participants',
  templateUrl: './event-participants.component.html',
  styleUrl: './event-participants.component.css'
})
export class EventParticipantsComponent {
  participants: any[] = [];
  eventId: number=0;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const eventIdParam = this.route.snapshot.paramMap.get('eventId');
    
    // Check if eventIdParam is null or undefined before parsing
    if (eventIdParam === null || eventIdParam === undefined) {
      this.toastr.error('Event ID is missing or invalid.');
      return;  // Exit early if there's no valid eventId
    }

    // Successfully parse the eventId
    this.eventId = +eventIdParam;

    if (isNaN(this.eventId) || this.eventId <= 0) {
      this.toastr.error('Invalid Event ID');
      return;
    }

    // this.loadParticipants();

  }

  // loadParticipants(): void {
  //   this.eventService.getEventParticipants(this.eventId).subscribe(
  //     (data) => {
  //       this.participants = data;
  //     },
  //     (error) => {
  //       this.toastr.error('Error loading participants');
  //       console.error(error);
  //     }
  //   );
  // }

  // removeParticipant(registrationId: number): void {
  //   this.eventService.removeParticipant(this.eventId, registrationId).subscribe(
  //     () => {
  //       this.toastr.success('Participant removed');
  //       this.loadParticipants(); // Refresh the participant list
  //     },
  //     (error) => {
  //       this.toastr.error('Error removing participant');
  //       console.error(error);
  //     }
  //   );
  // }

  
}
