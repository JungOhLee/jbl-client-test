import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/toPromise';


@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  message: string;
  failMessage: string;
  loginForm:FormGroup;
  model: Object = {
    email: "",
    password: ""
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.setMessage();
    this.createForm();
  }

  get email() { return this.loginForm.get('email')};
  get password() { return this.loginForm.get('password')};

  setMessage() {
    this.message = 'Login';
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.message = '로그인 중입니다. ';
    this.failMessage = "";
    this.authService.login(this.loginForm.value)
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
  checkLogin() {
    return this.authService.isLoggedIn
  }
}
