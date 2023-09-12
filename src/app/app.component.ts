import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  title = 'prattle-app';
  slider = 1;
  error = false;
  errorMsg = '';
  userEmail = '';
  userPass = '';
  userPass2 = '';
  userAuthenticated = false;

  changeSlider(num: number) {
    this.slider = num;
  }

  registerUser() {
    this.authService.registerUser(this.userEmail, this.userPass, (response) => {
      if (response.success) {
        console.log("SUCCESS!!");
        console.log(response);
      } else {
        console.log("FAILURE!");
        console.log(response);
        this.handleErrors(response.message);
      }
    })
  }

  loginUser() {
    console.log("Logging in...");

    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.userEmail, this.userPass)
    .then((userCredentials) => {
      console.log("Logged in!");
      console.log(userCredentials);
      this.userAuthenticated = true;
    })
    .catch((error) => {
       console.log("ERROR ->", error.code);
       this.handleErrors(error.code);
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
