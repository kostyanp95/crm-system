import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/models/interfaces";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]]
  })
  subscription: Subscription

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        if (params['registered']) {
          // you can login
        } else if (params['accessDenied']) {
          // nee auth
        }
      })
  }

  onSubmit(): void {
    this.form.disable()
    const user: User = this.form.getRawValue()
    this.subscription = this.authService.login(user)
      .subscribe(
        () => this.router.navigate(['/overview']),
        error => {
          console.log(error)
          this.form.enable()
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : null
  }
}
