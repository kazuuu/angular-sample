import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePage } from '../home/home.page';
import { BrowserModule } from '@angular/platform-browser';
import { AuthenticationService } from '../../../domain/services/authentication.service';
import { first } from 'rxjs';
import { ButtonShared } from '../../shared/button/button.shared';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonShared],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {
  formLogin: FormGroup;
  error: any;
  loading: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { 
    this.formLogin = this.formBuilder.group({
      username: [''],  
      password: [''],
    });
  }

  onSubmit() {
    console.log("Login");
    let username = this.formLogin.get('username')!.value ?? '';
    let password = this.formLogin.get('password')!.value ?? '';

    this.authenticationService.login(username, password)           
    .pipe(first())
    .subscribe({
      next: () => {
        // get return url from route parameters or default to '/'
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dash';
        this.router.navigate([returnUrl]);
      },
      error: error => {
        alert(error.error.error);
        console.log("authentication service Login Erro", error);
        this.error = error;
        this.loading = false;
      }
    });
  }

  irHome() {
    this.router.navigate(['/']);
  }
  
}
