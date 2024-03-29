import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/interfaces';
import { MaterializeService } from '../../shared/services/materialize.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(7)]]
  })
  subscription: Subscription

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.form.disable()
    const user: User = this.form.getRawValue()
    this.subscription = this.authService.register(user)
      .subscribe(
        () => this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        }),
        error => {
          MaterializeService.toast(error.error.message)
          this.form.enable()
        })
  }

  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : null
  }
}
