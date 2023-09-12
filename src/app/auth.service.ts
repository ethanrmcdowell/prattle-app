import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    loginUser() {

    }

    logoutUser() {

    }

    registerUser(email: string, password: string, callback: (response: { success: boolean, message: any }) => void) {
        const emailRegex = /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
        const auth = getAuth();
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // need to return the userCredentials back to app.component.ts
            callback({ success: true, message: userCredential });
          })
          .catch((error) => {
            // need to return the error.code back to app.component.ts
            callback({ success: false, message: error.code });
          })
    }
}