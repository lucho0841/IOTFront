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
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import { LoadingComponent } from './components/loading/loading.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { DashboardCard1Component } from './components/dashboard-card1/dashboard-card1.component';
import { CardComponent } from './components/card/card.component';
import { DashboardCharts1Component } from './components/dashboard-charts1/dashboard-charts1.component';
import { DashboardCharts2Component } from './components/dashboard-charts2/dashboard-charts2.component';
import { DashboardMini1Component } from './components/dashboard-mini1/dashboard-mini1.component';
import { DashboardMini2Component } from './components/dashboard-mini2/dashboard-mini2.component';
import { DashboardMini3Component } from './components/dashboard-mini3/dashboard-mini3.component';
import { DashboardMini4Component } from './components/dashboard-mini4/dashboard-mini4.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoadingComponent,
    DashboardComponent,
    DashboardCard1Component,
    CardComponent,
    DashboardCharts1Component,
    DashboardCharts2Component,
    DashboardMini1Component,
    DashboardMini2Component,
    DashboardMini3Component,
    DashboardMini4Component
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
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
        MatGridListModule,
        MatCardModule,
    ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}

