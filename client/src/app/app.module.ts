import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './routes/register-page/register-page.component';
import { TokenInterceptor } from "./shared/interceptors/token.interceptor";
import { OverviewPageComponent } from './routes/overview-page/overview-page.component';
import { HistoryPageComponent } from './routes/history-page/history-page.component';
import { OrderPageComponent } from './routes/order-page/components/order-page.component';
import { CategoriesPageComponent } from './routes/categories-page/categories-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesFormComponent } from './routes/categories-page/categories-form/categories-form.component';
import { PositionsFormComponent } from './routes/categories-page/categories-form/positions-form/positions-form.component';
import { HistoryListComponent } from './routes/history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './routes/history-page/history-filter/history-filter.component';
import { OrderCategoriesComponent } from './routes/order-page/components/order-categories/order-categories.component';
import { OrderPositionsComponent } from './routes/order-page/components/order-positions/order-positions.component';
import { AnalyticsPageComponent } from './routes/analytics-page/analytics-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
