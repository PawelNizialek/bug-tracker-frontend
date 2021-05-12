import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Project} from '../../models/project';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css']
})
export class RoleManagerComponent implements OnInit {
  public users?: User[];
  public editUser?: User;
  public delUser?: User;
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    userId: 0,
    enabled: true
  };
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }
  public getAllUsers(): void {
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
  public addUser(): void {
    const data = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role,
      enabled: this.user.enabled,
      userId: 0
    };
    document.getElementById('add-project-form').click();
    this.userService.addUser(data)
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
  public updateUser(user: User): void {
    document.getElementById('edit-project-form').click();
    this.userService.updateUser(user)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
    this.getAllUsers();
    window.location.reload();
  }
  public deleteUser(userId: number): void{
    document.getElementById('del-project-form').click();
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllUsers();
      },
      error => {
        console.log(error);
      }
    );
    this.getAllUsers();
  }
  public onOpenModal(user: User, mode: string): void{
    const container = document.getElementById('main-role-manager-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'edit'){
      this.editUser = user;
      button.setAttribute('data-target', '#editUserModal');
    }
    if (mode === 'delete'){
      this.delUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    container.appendChild(button);
    button.click();
  }

  enableUser(userId: number): void {
    this.userService.enableUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllUsers();
      },
      error => {
        console.log(error);
      }
    );
    window.location.reload();
  }

  disableUser(userId: number): void {
    this.userService.disableUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllUsers();
      },
      error => {
        console.log(error);
      }
    );
    window.location.reload();
  }

  requestAdmin(userId: number): void {
    this.userService.requestAdmin(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllUsers();
      },
      error => {
        console.log(error);
      }
    );
    window.location.reload();
  }
}
