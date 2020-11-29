import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesContainerComponent } from './shared/components/pages-container/pages-container/pages-container.component';
import { AuthGuard } from './shared/helpers/auth.guard';

import { LoginComponent } from './pages/login/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: PagesContainerComponent,
    loadChildren: () => import('./pages/pages.module').then(module => module.PagesModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
