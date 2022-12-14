import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './site/admin/admin.module';
import { ManagerModule } from './site/manager/manager.module';
import { UserModule } from './site/user/user.module';
import { LoginModule } from './site/login/login.module';
import { HeaderModule } from './site/header/header.module';
import { FooterModule } from './site/footer/footer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './site/shared/shared.module';
import { UserService } from './services/user-service.service';
import { AnimalServiceService } from './services/animal-service.service';
import { ErrorModule } from './site/error/error.module';
import { ErrorServiceService } from './services/error-service.service';
import { AnimalTypeServiceService } from './services/animal-type-service.service';
import { LinkUserAnimalService } from './services/link-user-animal.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LoginModule,
    AdminModule,
    ManagerModule,
    UserModule,
    ErrorModule,
    HeaderModule,
    FooterModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    AnimalServiceService,
    AnimalTypeServiceService,
    LinkUserAnimalService,
    ErrorServiceService
  ], // TODO verifier utilité
  bootstrap: [AppComponent]
})
export class AppModule { }
