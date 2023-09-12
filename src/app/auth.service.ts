import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    auth = getAuth();

    loginUser(email: string, password: string, callback: (response: { success: boolean, message: any }) => void) {
        signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
            callback({  success: true, message: userCredential })
        })
        .catch((error) => {
            callback({ success: false, message: error.code })
        })
    }

    logOutUser(callback: (response: { success: boolean, message?: any }) => void) {
        signOut(this.auth)
        .then(() => {
            callback({ success: true });
        })
        .catch((error) => {
            callback({ success: false, message: error })
        })
    }

    registerUser(email: string, password: string, callback: (response: { success: boolean, message: any }) => void) {
          createUserWithEmailAndPassword(this.auth, email, password)
          .then((userCredential) => {
            callback({ success: true, message: userCredential });
          })
          .catch((error) => {
            callback({ success: false, message: error.code });
          })
    }
}