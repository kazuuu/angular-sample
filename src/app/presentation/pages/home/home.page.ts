import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ButtonShared } from '../../shared/button/button.shared';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterOutlet, ButtonShared],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  title = 'HomePage';

  constructor(
    private router: Router,
  ) { }
  
  irLogin() {
    console.log("irLogin")
    this.router.navigate(["/login"]);
  }

}