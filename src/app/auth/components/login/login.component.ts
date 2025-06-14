import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../core/services/http.service';
import { APIS } from '../../../../core/constants/server-endpoints';
import { AlertService } from '../../../../core/services/alert.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../../../core/constants/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private alert: AlertService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.http.post(APIS.AUTH.LOGIN, this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('authToken',res?.accessToken);
          this.alert.success('login successfull.');
          this.router.navigate([ROUTES.MAIN.BASE]);
        },
        error : (error) => {
          this.alert.error(error.error.message || 'Login failed.')
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
