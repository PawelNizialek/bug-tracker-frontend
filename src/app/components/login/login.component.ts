import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {}
}
