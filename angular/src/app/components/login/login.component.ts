import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/models/AuthUser';
import { User } from 'src/app/models/User';
import { AuthUserService } from 'src/app/services/auth.user.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from "jwt-decode";
import { Token } from 'src/app/models/Token';
import { Role } from 'src/app/models/Role';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup
  loginForm: FormGroup

  constructor(private userService: UserService, private authService: AuthUserService, private router: Router) {
    userService.user.valid = false;
    this.signupForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    })
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])

    })
  }

  getLogin() {
    let u: User = this.loginForm.value;
    let authUser: AuthUser = new AuthUser;
    authUser.username = u.email;
    authUser.password = u.password
    this.validateUserAndNavigate(authUser);
  }

  signUpUser() {
    let userObj: User = this.signupForm.value
    userObj.id = userObj.email;
    userObj.username = userObj.email;
    userObj.role = "customer";
    this.userService.saveUser(userObj)
      .subscribe((res) => {
        userObj.valid = true;
        this.userService.user = userObj;
        alert("Registered Successfully, Kindly login to proceed.")
        this.router.navigate(["login"]);
      });
  }

  validateUserAndNavigate(user: AuthUser) {

    this.authService.authenticateUser(user).
      subscribe((res: any) => {

        let token: string = JSON.stringify(res)
        let decoded: Token = jwt_decode(token);
        let u: User = new User;
        u.valid = true;
        u.email = user.username;
        this.userService.user = u;
        let role: Role[] = decoded.role;
        if (role[0].authority == "admin") {
          this.router.navigate(['/', 'admin', 'manageFlights']);
        }
        else {
          this.router.navigate(["searchFlight"])
          sessionStorage.setItem("userid", user.username);
        }
      });

  }

  ngOnInit(): void {
  }

}
