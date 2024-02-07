import { Routes } from '@angular/router';
import { HomePage } from './presentation/pages/home/home.page';
import { LoginPage } from './presentation/pages/login/login.page';
import { DashPage } from './presentation/pages/dash/dash.page';
import { AuthGuard } from './core/security/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Home page',
  },  
  {
    path: 'login',
    component: LoginPage,
    title: 'Home page',
  },
  {
    path: 'dash',
    component: DashPage,
    title: 'Dash page',
    canActivate: [AuthGuard],
  },
];
