import { Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { LayoutComponent } from './Component/layout/layout.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo : 'dashboard',
        pathMatch : 'full',
    }
    ,
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
    
                path:'dashboard',
                component:DashboardComponent,
                // canActivate: [authGuard]
    
            },                 
            
        ]
    },
];
