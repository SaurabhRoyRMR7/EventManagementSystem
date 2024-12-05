export class EventRegistrationResponse {
    responseId?: number;
    registrationId?: number | null;
    formFieldId?: number | null;
    responseValue?: string | null;
    createdAt?: Date;
    createdBy?: string;
    lastModifiedAt?: Date;
    lastModifiedBy?: string;
    formField?: EventRegistrationFormsField | null;  // Optional related field
    registration?: EventRegistration | null;  // Optional related registration
  
    constructor(
      responseId?: number,
      registrationId?: number | null,
      formFieldId?: number | null,
      responseValue?: string | null,
      createdAt?: Date,
      createdBy?: string,
      lastModifiedAt?: Date,
      lastModifiedBy?: string,
      formField?: EventRegistrationFormsField | null,
      registration?: EventRegistration | null
    ) {
      this.responseId = responseId;
      this.registrationId = registrationId;
      this.formFieldId = formFieldId;
      this.responseValue = responseValue;
      this.createdAt = createdAt;
      this.createdBy = createdBy;
      this.lastModifiedAt = lastModifiedAt;
      this.lastModifiedBy = lastModifiedBy;
      this.formField = formField;
      this.registration = registration;
    }
  }
  
  // Define related models (EventRegistrationFormsField, EventRegistration)
  
  export class EventRegistrationFormsField {
    // Define properties for EventRegistrationFormsField model here
  }
  
  export class EventRegistration {
    // Define properties for EventRegistration model here
  }
  