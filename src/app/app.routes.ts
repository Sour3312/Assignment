import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { AuthGuard } from './security/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'init', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'init', component: LoginComponent },
  { path: 'dash', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'create', canActivate: [AuthGuard], component: CreateComponent },
];
