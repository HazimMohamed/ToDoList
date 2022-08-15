import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login.service';
import {ApiStatus} from '../model/apistatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isLoggedIn: ApiStatus;

  constructor(private loginService: LoginService) {
    this.isLoggedIn = ApiStatus.NOT_STARTED;
  }

  ngOnInit() {
    this.isLoggedIn = ApiStatus.PENDING;
    this.loginService.isLoggedIn().then(() => {
      this.isLoggedIn = ApiStatus.SUCCESS;
    }).catch((reason => {
      this.isLoggedIn = ApiStatus.FAILURE;
    }));
  }

  showLoginPage(): boolean {
    return this.isLoggedIn == ApiStatus.FAILURE;
  }
}