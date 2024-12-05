export class EventRegistrationDTO
{
   RegistrationId?: number;
   EventId?: number;
   UserId?: number;
//    RegistrationDate?: Date;
   RegistrationCode?: string;
   RegistrationResponses?: EventRegistrationResponseDTO[];
}
export interface EventRegistrationResponseDTO {
    FieldId: number;
    ResponseValue: string;
  }