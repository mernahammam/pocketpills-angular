import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { TopBarComponent } from './components/shared/header/top-bar/top-bar.component';
import { MenuBarComponent } from './components/shared/header/menu-bar/menu-bar.component';
import { IdentityBarComponent } from './components/shared/header/identity-bar/identity-bar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopBarComponent,
    MenuBarComponent,
    IdentityBarComponent,
    FooterComponent,
    HomepageComponent,
    CategoriesComponent,
    PharmaciesComponent,
    ProductsComponent,
    ContactUsComponent,
    AboutUsComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
