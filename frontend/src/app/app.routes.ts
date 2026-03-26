import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardComponent } from './dashboard-page/dashboard-page.component';
import { CreateListPageComponent } from './create-list-page/create-list-page.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { PantryPageComponent } from './pantry-page/pantry-page.component';
import { ViewListPageComponent } from './view-list-page/view-list-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
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
        component: EditPageComponent,
        title: "Edit List"
    },
    {
        path: "pantry",
        component: PantryPageComponent,
        title: "Edit List"
    },
    {
        path: "view/:id",
        component: ViewListPageComponent,
        title: "View List"
    },
    {
        path: "**",
        redirectTo: 'login'
    }
];
