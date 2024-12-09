import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { FieldOption } from '../models/field-option.model';

@Injectable({
  providedIn: 'root',
})
export class FieldOptionService {
  private apiUrl = `${environment.apiUrl}/field-options`; 

  constructor(private http: HttpClient) {}

  // Create a new field option
  createFieldOption(option: FieldOption): Observable<FieldOption> {
    return this.http.post<FieldOption>(this.apiUrl, option);
  }

  // Get field options for a specific field
  getFieldOptions(formFieldId: number): Observable<FieldOption[]> {
    return this.http.get<FieldOption[]>(`${this.apiUrl}/form-field/${formFieldId}`);
  }
}
