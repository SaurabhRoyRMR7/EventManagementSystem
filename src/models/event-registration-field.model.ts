export class EventRegistrationFormField {
    formFieldId: number;
    eventId: number;
    fieldName: string;
    fieldType: string; 
    isRequired: boolean;
    options?: string[] = [];
  
    constructor() {
      this.formFieldId = 0;
      this.eventId = 0;
      this.fieldName = '';
      this.fieldType = 'Text'; 
      this.isRequired = true;
    }
  }
  