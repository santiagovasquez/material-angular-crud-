import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';

export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardCrmComponent },
        { path: 'material-widgets', loadChildren: '../material-widgets/material-widgets.module#MaterialWidgetsModule' },
        { path: 'tables', loadChildren: '../tables/tables.module#TablesModule' },
        { path: 'maps', loadChildren: '../maps/maps.module#MapsModule' },
        { path: 'charts', loadChildren: '../charts/charts.module#ChartsModule' },
        { path: 'pages', loadChildren: '../pages/pages.module#PagesModule' },
        { path: 'forms', loadChildren: '../forms/forms.module#FormModule' },
        { path: 'guarded-routes', loadChildren: '../guarded-routes/guarded-routes.module#GuardedRoutesModule' },
        { path: 'scrumboard', loadChildren: '../scrumboard/scrumboard.module#ScrumboardModule' },
    ]
}];
