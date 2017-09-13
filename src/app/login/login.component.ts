import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/toPromise';


@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  message: string;
  failMessage: string;
  model: Object = {
    email: "",
    password: ""
  };

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Login';
  }

  login() {
    this.message = '로그인 중입니다. ';
    this.failMessage = "";
    this.authService.login(this.model)
    .then(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';

        // Redirect the user
        this.router.navigateByUrl(redirect);
      } else {
        this.failMessage = "로그인에 실패하였습니다. "
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
