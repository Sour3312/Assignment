import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { AuthGuard } from './security/auth/auth.guard';

export const routes: Routes = [
  // Redirect empty path to 'init' route
  { path: '', redirectTo: 'init', pathMatch: 'full' },

  // Route for initial login page
  { path: 'init', component: LoginComponent },

  // Route for dashboard with AuthGuard protection
  { path: 'dash', canActivate: [AuthGuard], component: DashboardComponent },

  // Route for create component with AuthGuard protection
  { path: 'create', canActivate: [AuthGuard], component: CreateComponent },
];

