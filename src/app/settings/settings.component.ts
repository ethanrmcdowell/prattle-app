import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userEmail: any;
  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  })

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userEmail = this.authService.userEmail;
    console.log("USER EMAIL:",  this.authService.userEmail);
  }

  saveProfile() {
    console.log("save button clicked~~");
    console.log("form ->", this.profileForm);
  }

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

  submitData() {
    console.log("hey :)");
  }
}
