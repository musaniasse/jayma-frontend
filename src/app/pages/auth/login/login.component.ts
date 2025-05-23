import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ICredentials, LoginService} from '../../../core/service/login.service';
import {Router, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../../../core/model/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: '../static/css/style.scss'
})
export class LoginComponent implements OnDestroy{

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  loginFormGroup = this.formBuilder.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
  });

  private loginSubscription: Subscription | null = null;

  invalidCredentials = false;


  login() {
    this.loginSubscription = this.loginService.login(
      this.loginFormGroup.value as ICredentials
    ).subscribe({
      next: (res: User | null | undefined) => {
        this.navigateToHome();
      },
      error: (err: Error) => {
        this.invalidCredentials = true;
      }
    })
  }
  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
