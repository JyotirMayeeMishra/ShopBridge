import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersModule } from './orders/orders.module';
import { SiteLayoutModule } from './site-layout/site-layout.module';
import { FormsModule } from '@angular/forms' 
 
import { ReactiveFormsModule} from '@angular/forms';
import { PopUpComponent } from './shared/pop-up/pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { FormGrpComponent } from './shared/form-grp/form-grp.component';
// import { FileUploadComponent } from './shared/img-upload/file-upload.component' 

@NgModule({
  declarations: [
    AppComponent,
    // PopUpComponent,
    // FormGrpComponent,
    // FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrdersModule,
    SiteLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule ,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
