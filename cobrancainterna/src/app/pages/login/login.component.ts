import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { 
  }

  error = '';
  inputLogin = '';
  inputPassword = '';

  ngOnInit(): void {
  }

  login() {
    console.log("input", this.inputLogin);
    this.authService.login(this.inputLogin, this.inputPassword)
    .pipe(first())
    .subscribe(
      (data) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.error = error;
        console.log('LoginPage Error' + this.error);

        this.toastr.error('Dados incorretos', 'Erro no Login', {
          timeOut: 5000,
          progressBar: true,
        });
      }
    );
  }

}
