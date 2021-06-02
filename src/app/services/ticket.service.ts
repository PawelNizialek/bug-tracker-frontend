import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Ticket} from '../models/ticket';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public getAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiServerUrl}/api/v1/ticket/all`);
  }
  public addTicket(ticket: Ticket, projectId: number): Observable<Ticket> {
    return this.http.post<Ticket>(
      `${this.apiServerUrl}/api/v1/ticket/create-ticket/${projectId}`, ticket
    );
  }
  public updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(
      `${this.apiServerUrl}/api/v1/ticket/edit`, ticket
    );
  }
  public deleteTicket(ticketId: number): Observable<void> {
    console.log(ticketId);
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/ticket/delete/${ticketId}`);
  }
  public assignUser(user: User, ticketId: number): Observable<any>{
    return this.http.post<Ticket[]>(`${this.apiServerUrl}/api/v1/ticket/assign/${ticketId}`, user);
  }
  public closeTicket(ticketId: number): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/api/v1/ticket/close/${ticketId}`);
  }
}
