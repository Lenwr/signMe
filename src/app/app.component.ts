import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'signMe';

  constructor(
    private authService : AuthService
  ) {
  }
  check() : boolean {
    if(this.authService.isLoggedIn){
      return true
    }
    return false;
  }
}
