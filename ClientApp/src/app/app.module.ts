// import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { HelperService } from './services/helper.service';
import { AuthRouteGuardService } from './services/auth-route-guard.service';
import { ComponentService } from './services/component.service';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { AppSettingsService } from './services/app-settings.service';
import { PermissionDirective } from './services/permission.directive';
import { BrowserModule } from '@angular/platform-browser';

const appInitializerFn = (appConfig: AppSettingsService) => {
  return () => {
    return appConfig.loadConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    AppSettingsComponent,
    PermissionDirective,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [AuthRouteGuardService], pathMatch: 'full' },
      { path: 'counter', canActivate: [AuthRouteGuardService], component: CounterComponent },
      { path: 'fetch-data', canActivate: [AuthRouteGuardService], component: FetchDataComponent },
      { path: 'app-settings', canActivate: [AuthRouteGuardService], component: AppSettingsComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [
    { provide: 'ORIGIN_URL', useFactory: getBaseUrl },
    HelperService,
    AuthRouteGuardService,
    ComponentService,
    AppSettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppSettingsService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
