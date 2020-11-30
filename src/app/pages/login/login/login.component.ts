import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/services/login/login.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get dadosLogin() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.dadosLogin.username.value, this.dadosLogin.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['']);
          this.loading = false;
        },
        error => {
          this.loginError = true;
          this.loading = false;
        });
  }

}
