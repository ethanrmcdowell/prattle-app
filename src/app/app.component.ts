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
    // console.log("EMAIL ->", this.userEmail);
    // console.log("PW ->", this.userPass);
    // console.log("PW2 ->", this.userPass2);
    // return;


    const auth = getAuth();
    const email = 'ethan.r.mcdowell@gmail.com';
    const pass = 'Hotchkiss89!';
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      console.log("Registered!");
      console.log(userCredential);
    })
    .catch((error) => {
      console.log("ERROR ->", error.message);
      this.handleErrors(error.code);
    })
  }

  handleErrors(errorCode: string) {
    if (errorCode === 'auth/email-already-in-use') {
      this.error = true;
      this.errorMsg = "E-mail address already in use!";
    }
    setTimeout(() => {
      this.error = false;
      this.errorMsg = '';
    }, 5000);
  }
}
