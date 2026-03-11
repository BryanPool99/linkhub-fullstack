import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
    },
    {
        path: 'presentacion-componentes',
        loadComponent: () => import('./features/presentacion-componentes/presentacion-componentes').then((m) => m.PresentacionComponentes),
    },
    {
        path: 'auth',
        children: [
            {
                path: '',redirectTo: 'login', pathMatch: 'full'
            },
            {
                path: 'login',
                loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
            },
            {
                path: 'register',
                loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
            },
            {
                path: '**',
                loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
            }
        ]
    },
    {
        path: 'admin',
        children: [
            {
                path: '',redirectTo: 'dashboard', pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/admin/dashboard/dashboard').then((m) => m.Dashboard),
            },
            {
                path: 'profile-config',
                loadComponent: () => import('./features/admin/profile-config/profile-config').then((m) => m.ProfileConfig),
            }
        ]
    },
    {
        path: 'public-profle',
        loadComponent: () => import('./features/public-profile/public-profile').then((m) => m.PublicProfile),
    },
    {
        path: '**',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
    }
];
