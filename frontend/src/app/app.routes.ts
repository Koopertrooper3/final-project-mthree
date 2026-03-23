import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './dashboard-page/dashboard-page.component';
import { CreateListPageComponent } from './create-list-page/create-list-page.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

export const routes: Routes = [
    
    {
        path: 'login',
        component: LoginPageComponent,
        title: 'Login'
    },
    {
        path: 'register',
        component: RegisterPageComponent,
        title: 'Register'
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        title: 'Dashboard'
    },
    {
        path: "create",
        component: CreateListPageComponent,
        title: "Create a Grocery List"
    },
    {
        path: "edit/:id",
        component: PlaceholderComponent,
        title: "Edit List"
    },
    {
        path: "**",
        redirectTo: 'login'
    }
];
