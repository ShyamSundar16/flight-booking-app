import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup
  loginForm: FormGroup

  constructor(private userService: UserService, private router: Router) {

    this.signupForm = new FormGroup({
      signupemail: new FormControl("", [
        Validators.required,
        Validators.email
      ])
    })
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ])
    })
  }

  getLogin(emailId: string) {

    let u = new User();
    u.email = emailId;
    u.valid = true;
    this.userService.user = u;

    if (u.email == "admin@gmail.com") {
      this.router.navigate(['/', 'admin', 'manageFlights']);
    }
    else {
      this.router.navigate(["searchFlight"])
    }
  }

  ngOnInit(): void {
  }

}
