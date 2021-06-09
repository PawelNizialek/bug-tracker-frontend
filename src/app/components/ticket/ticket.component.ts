import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {Ticket} from '../../models/ticket';
import {Project} from '../../models/project';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})

export class TicketComponent implements OnInit {
  public tickets?: Ticket[];
  public editTicket: Ticket;
  public delTicket: Ticket;
  public addUserTicket: Ticket;
  public selectedProject: number;
  public users?: User[];
  public projects?: Project[];
  submitted = false;
  ticket: Ticket = {
    created_at: '',
    desc: '',
    priority: '',
    status: '',
    title: '',
    type: '',
    usersEmails: ''
  };
  constructor(private ticketService: TicketService, private userService: UserService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.retrieveAllTickets();
    this.retrieveAllUsers();
    this.retrieveAllProjects();
  }
  public searchTickets(key: string): void{
    const results: Ticket[] = [];
    for (const ticket of this.tickets) {
      if (ticket.usersEmails.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(ticket);
      }
    }
    this.tickets = results;
    if (!key || results.length === 0) {
      this.retrieveAllTickets();
    }
  }
  public filterItemsOfType(type): any{
    return this.projects?.filter(x => x.status === type);
  }
  public retrieveAllTickets(): void {
    setTimeout(() => {
    this.ticketService.getAll()
      .subscribe(
        data => {
          this.tickets = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }, 1000);
  }
  public retrieveAllUsers(): void{
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
  public retrieveAllProjects(): void{
    this.projectService.getAll()
      .subscribe(
        data => {
          this.projects = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
  public addTicket(): void {
    const data = {
      created_at: this.ticket.created_at,
      desc: this.ticket.desc,
      priority: this.ticket.priority,
      title: this.ticket.title,
      type: this.ticket.type,
      status: this.ticket.status
    };
    document.getElementById('add-ticket-form').click();
    this.ticketService.addTicket(data, this.selectedProject)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
    window.location.reload();
  }
  public onOpenModal(ticket: Ticket, mode: string): void{
    const container = document.getElementById('main-ticket-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      this.selectedProject = 0;
      button.setAttribute('data-target', '#addTicketModal');
    }
    if (mode === 'edit'){
      this.editTicket = ticket;
      button.setAttribute('data-target', '#editTicketModal');
    }
    if (mode === 'delete'){
      this.delTicket = ticket;
      button.setAttribute('data-target', '#deleteTicketModel');
    }
    if (mode === 'addUsers'){
      this.addUserTicket = ticket;
      button.setAttribute('data-target', '#assignUserModal');
    }
    container.appendChild(button);
    button.click();
  }
  public updateTicket(ticket: Ticket): void {
    this.ticketService.updateTicket(ticket)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
    window.location.reload();
  }
  public deleteTicket(ticketId: number): void{
    this.ticketService.deleteTicket(ticketId).subscribe(
      (response: void) => {
        console.log(response);
        this.retrieveAllTickets();
      },
      error => {
        console.log(error);
      }
    );
    window.location.reload();
  }
  public assignUser(user: User, ticketId: number): void{
    const data = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      userId: 0,
      enabled: true
    };
    this.ticketService.assignUser(user, ticketId)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
    window.location.reload();
  }
  public changeProject(id): void{
    console.log(id);
    this.selectedProject = id;
  }
  public closeTicket(id: number): void{
    this.ticketService.closeTicket(id).subscribe(
      (response: void) => {
        console.log(response);
        this.retrieveAllTickets();
      },
      error => {
        console.log(error);
      }
    );
    window.location.reload();
  }
}
