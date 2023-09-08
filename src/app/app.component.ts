import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prattle-app';
  slider = 1;

  changeSlider(num: number) {
    this.slider = num;
  }
}
