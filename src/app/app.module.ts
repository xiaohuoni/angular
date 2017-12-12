import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeService } from './services/home-service.service';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'home',component:HomeComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    HomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }