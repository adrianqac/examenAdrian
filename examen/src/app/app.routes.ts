import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';

export const routes: Routes = [
    {path: '', component: WelcomeComponent},
    {path: 'proveedores', component: ProveedoresComponent}
];

