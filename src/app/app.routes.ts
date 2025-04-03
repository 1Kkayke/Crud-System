import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ConsultComponent } from './consult/consult.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'home',
        component: AppComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'consult',
        component: ConsultComponent,
    }
];
