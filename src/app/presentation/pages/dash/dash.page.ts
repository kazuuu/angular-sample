import { Component } from '@angular/core';
import { AuthenticationService } from '../../../domain/services/authentication.service';
import { ButtonShared } from '../../shared/button/button.shared';
import { Router } from '@angular/router';

@Component({
  selector: 'dash-page',
  standalone: true,
  imports: [ButtonShared],
  templateUrl: './dash.page.html',
  styleUrl: './dash.page.scss'
})
export class DashPage {
  title = 'DashPage';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { 
  }

  getName() {
    return this.authenticationService.currentUser.username;
  }

  btnLogout() {
    return this.authenticationService.logout();
  }

  irHome() {
    this.router.navigate(['/']);
  }

}
