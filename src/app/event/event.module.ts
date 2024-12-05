import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { FormsModule } from '@angular/forms';
import { EventParticipantsComponent } from './event-participants/event-participants.component';
import { EventRegistrationComponent } from './event-registration/event-registration.component';


@NgModule({
  declarations: [
    EventListComponent,
    EventCreateComponent,
    EventDetailComponent,
    EventParticipantsComponent,
    EventRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    EventListComponent,
    EventCreateComponent,
    EventDetailComponent
  ]
})
export class EventModule { }
