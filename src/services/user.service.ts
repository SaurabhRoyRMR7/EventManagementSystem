// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/User`;
  

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
  saveUserDetails(userId: number, userRole: string,token:string): void {
    if (userId !== undefined && userRole !== undefined) {
        localStorage.setItem('userId', userId.toString());  
        localStorage.setItem('userRole', userRole); 
        localStorage.setItem('userToken', token); 


      } else {
        console.error('Invalid user details:', userId, userRole);
      }
  }
  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('userToken'); // Assuming the token is saved with this key

    // Set the Authorization header with the Bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
    // return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

 
  updateUserRole(userId: number, userRoleId: number): Observable<any> {
    const token = localStorage.getItem('userToken');  // Make sure the token is saved during login

    // Set the headers with the Authorization Bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.apiUrl}/user/UpdateUserRole/${userId}`, 
                              { UserRoleId: userRoleId }, { headers });
    // return this.http.put<any>(`${this.apiUrl}/user/UpdateUserRole/${userId}`, { UserRoleId: userRoleId });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/DeleteUser/${userId}`);
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }
  getOrganizerIdByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/organizerId/${userId}`);
  }
  getUserProfile(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
}
