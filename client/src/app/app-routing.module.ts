import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayoutComponent } from "./shared/layouts/auth-layout/auth-layout.component";
import { SiteLayoutComponent } from "./shared/layouts/site-layout/site-layout.component";
import { LoginPageComponent } from "./routes/login-page/login-page.component";
import { RegisterPageComponent } from "./routes/register-page/register-page.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { OverviewPageComponent } from "./routes/overview-page/overview-page.component";
import { HistoryPageComponent } from "./routes/history-page/history-page.component";
import { OrderPageComponent } from "./routes/order-page/components/order-page.component";
import { CategoriesPageComponent } from "./routes/categories-page/categories-page.component";
import { CategoriesFormComponent } from "./routes/categories-page/categories-form/categories-form.component";
import { OrderCategoriesComponent } from './routes/order-page/components/order-categories/order-categories.component';
import { OrderPositionsComponent } from './routes/order-page/components/order-positions/order-positions.component';
import { AnalyticsPageComponent } from './routes/analytics-page/analytics-page.component';

const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: "login",
        component: LoginPageComponent,
      },
      {
        path: "register",
        component: RegisterPageComponent,
      },
    ]
  },
  {
    path: "",
    component: SiteLayoutComponent,
    canActivate: [
      AuthGuard
    ],
    children: [
      {
        path: 'overview',
        component: OverviewPageComponent
      },
      {
        path: 'analytics',
        component: AnalyticsPageComponent
      },
      {
        path: 'history',
        component: HistoryPageComponent
      },
      {
        path: 'order',
        component: OrderPageComponent,
        children: [
          {
            path: '',
            component: OrderCategoriesComponent
          },
          {
            path: ':id',
            component: OrderPositionsComponent
          }
        ]
      },
      {
        path: 'categories',
        component: CategoriesPageComponent
      },
      {
        path: 'categories/new',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/:id',
        component: CategoriesFormComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
