import { EventRegistrationResponse } from "./eventRegistrationResponse.model";
import { User } from "./organizer.model";

export class EventRegistration {
    registrationId?: number;
    eventId?: number | null;
    userId?: number | null;
    registrationDate?: Date | null;
    registrationCode?: string | null;
    paymentStatus?: string | null;
    createdAt?: Date;
    createdBy?: string;
    lastModifiedAt?: Date;
    lastModifiedBy?: string;
    event?: Event | null;  // Optional Event related to the registration
    eventRegistrationResponses?: EventRegistrationResponse[] = [];  // Array of EventRegistrationResponse
    payments?: any[] = [];  // Array of Payment
    user?: User | null;  // Optional User related to the registration
  
    constructor(
      registrationId?: number,
      eventId?: number | null,
      userId?: number | null,
      registrationDate?: Date | null,
      registrationCode?: string | null,
      paymentStatus?: string | null,
      createdAt?: Date,
      createdBy?: string,
      lastModifiedAt?: Date,
      lastModifiedBy?: string,
      event?: Event | null,
      eventRegistrationResponses?: EventRegistrationResponse[],
      payments?: any[],
      user?: User | null
    ) {
      this.registrationId = registrationId;
      this.eventId = eventId;
      this.userId = userId;
      this.registrationDate = registrationDate;
      this.registrationCode = registrationCode;
      this.paymentStatus = paymentStatus;
      this.createdAt = createdAt;
      this.createdBy = createdBy;
      this.lastModifiedAt = lastModifiedAt;
      this.lastModifiedBy = lastModifiedBy;
      this.event = event;
      this.eventRegistrationResponses = eventRegistrationResponses;
      this.payments = payments;
      this.user = user;
    }
  }
  