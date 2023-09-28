import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private authService: AuthService) {}

  signOutUser() {
    this.authService.logOutUser((response) => {
      if (response.success) {
        console.log("SIGNED OUT!!");
        console.log(response);
      } else {
        console.log("FAILURE!");
        console.log(response);
      }
    })
  }
}
