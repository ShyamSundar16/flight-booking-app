import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    u.valid = true;
    this.userService.user = u;
    this.validateUserAndNavigate(u.email, u.password);
  }

  signUpUser() {
    let userObj: User=this.signupForm.value
    userObj.id=userObj.email;
    this.userService.saveUser(userObj)
      .subscribe((res) => {
        userObj.valid = true;
        this.userService.user = userObj;
        this.router.navigate(["searchFlight"]);
      });
  }

  validateUserAndNavigate(emailId: string, password: string) {
    // this.router.navigate(['/', 'admin', 'manageFlights']);
              this.router.navigate(["searchFlight"])

    // let filteredUserObservable$: Observable<User> = this.userService.getUserById(emailId);
    // filteredUserObservable$.subscribe(filteredUserObservable => {
      
    //   if(filteredUserObservable.password == password){
    //     if (emailId == "admin@gmail.com") {
    //       this.router.navigate(['/', 'admin', 'manageFlights']);
    //     }
    //     else {
    //       this.router.navigate(["searchFlight"])
    //       sessionStorage.setItem("userid", emailId);

    //     }
    //   }
    //   else {
    //     alert("Invalid Credentials");
    //   }
    // });
  }

  ngOnInit(): void {
  }

}
