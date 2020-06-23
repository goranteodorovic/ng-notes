import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { SignupComponent } from "./auth/signup/signup.component";

import { environment } from "../environments/environment";
import { NavigationComponent } from "./navigation/navigation.component";
import { VerifyEmailComponent } from "./auth/verify-email/verify-email.component";
import { AuthService } from "./services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

import { AuthGuard } from "./services/auth-guard.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavigationComponent,
    VerifyEmailComponent,
    SigninComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [AngularFireAuth, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
