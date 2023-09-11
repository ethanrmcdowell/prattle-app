import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prattle-app';
  slider = 1;
  error = false;
  errorMsg = '';
  userEmail = '';
  userPass = '';
  userPass2 = '';

  changeSlider(num: number) {
    this.slider = num;
  }

  registerUser() {
    if (this.userPass !== this.userPass2) {
      console.log("MIS-MATCHED PASSWORD!");
      this.handleErrors('auth/passwords-no-match');
      return;
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.userEmail, this.userPass)
      .then((userCredential) => {
        console.log("Registered!");
        console.log(userCredential);
      })
      .catch((error) => {
        console.log("ERROR ->", error.message);
        this.handleErrors(error.code);
      })
    }
  }

  handleErrors(errorCode: string) {
    if (errorCode === 'auth/email-already-in-use') {
      this.error = true;
      this.errorMsg = "E-mail address already in use!";
    } else if (errorCode === 'auth/passwords-no-match') {
      this.error = true;
      this.errorMsg = "Passwords do not match."
    }


    setTimeout(() => {
      this.error = false;
      this.errorMsg = '';
    }, 5000);
  }
}
