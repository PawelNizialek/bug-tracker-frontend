import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User} from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  logged = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  loginUser(): void {
    const data = {
      firstName: null,
      lastName: null,
      email: this.user.email,
      password: this.user.password
    };
    this.loginService.login(data)
      .subscribe(
        response => {
          console.log(response);
          this.logged = true;
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log(error);
        });
  }
}
