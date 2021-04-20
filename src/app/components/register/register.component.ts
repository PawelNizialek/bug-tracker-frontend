import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    userId: 0,
    enabled: true
  };
  registered = false;

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }
  saveUser(): void {
    const data = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password
    };
    this.registerService.addUser(data)
      .subscribe(
        response => {
          console.log(response);
          this.registered = true;
        },
        error => {
          console.log(error);
        });
  }
}
