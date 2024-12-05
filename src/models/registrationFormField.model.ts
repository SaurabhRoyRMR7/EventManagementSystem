export class RegistrationFormField {
    fieldName: string;
    fieldType: string;
    isRequired: boolean;
    dropdownOptions: string[];  
    radioOptions: string[];    
  
    constructor() {
      this.fieldName = '';
      this.fieldType = 'Text';
      this.isRequired = false;
      this.dropdownOptions = [];  // Initialize as empty array
    this.radioOptions = [];    
    }
  }