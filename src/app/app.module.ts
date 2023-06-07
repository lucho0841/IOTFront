import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {interceptorProvider} from "./interceptors/http.interceptor";
import {HttpClientModule} from '@angular/common/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoadingComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        DashboardModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
    ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}

