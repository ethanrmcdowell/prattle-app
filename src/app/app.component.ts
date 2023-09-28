import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  title = 'prattle-app';
  slider = 1;
  error = false;
  errorMsg = '';
  userEmail = '';
  userPass = '';
  userPass2 = '';
  userAuthenticated = false;

  ngOnInit() {
    this.authService.userAuthenticated$.subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    })
  }

  changeSlider(num: number) {
    this.slider = num;
  }

  registerUser() {
    this.authService.registerUser(this.userEmail, this.userPass, (response) => {
      if (response.success) {
        console.log("SUCCESS:", response);
      } else {
        console.log("FAILURE:", response);
        this.handleErrors(response.message);
      }
    })
  }

  loginUser() {
    this.authService.loginUser(this.userEmail, this.userPass, (response) => {
      if (response.success) {
        console.log("SUCCESS:", response);
      } else {
        console.log("FAILURE:", response);
        this.handleErrors(response.message);
      }
    })
  }

  signOutUser() {
    this.authService.logOutUser((response) => {
      if (response.success) {
        console.log("SUCCESS:", response);
      } else {
        console.log("FAILURE:", response);
        this.handleErrors(response.message);
      }
    })
  }

  handleErrors(errorCode: string) {
    this.error = true;
    if (errorCode === 'auth/email-already-in-use') {
      this.errorMsg = "E-mail address already in use!";
    } else if (errorCode === 'auth/passwords-no-match') {
      this.errorMsg = "Passwords do not match."
    } else if (errorCode === 'auth/invalid-email') {
      this.errorMsg = "E-mail address is invalid.";
    } else if (errorCode === 'auth/user-not-found') {
      this.errorMsg = "User not found."
    } else if (errorCode === 'auth/weak-password') {
      this.errorMsg = "Please use a stronger password."
    } else {
      this.errorMsg = "Unspecified error.";
    }


    setTimeout(() => {
      this.error = false;
      this.errorMsg = '';
    }, 5000);
  }
}
