import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { HomeComponent } from './home/home/home.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { LoginService } from '../shared/services/login/login.service';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [
    ProductFormComponent, 
    HomeComponent, 
    ProductDetailComponent, 
    ProductListComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  entryComponents:[
    HomeComponent
  ],
  providers: [LoginService]
})
export class PagesModule { }
